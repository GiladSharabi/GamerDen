import { PrismaClient } from "@prisma/client";
import { Gender, User } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "..";

const saltRounds = 10;

const db = new PrismaClient();

export type userResult = {
  error?: String;
  user?: User;
};

export async function getUserById(req: Request, res: Response) {
  const userid = parseInt(req.params.id, 10);
  try {
    const user = await db.user.findUnique({
      where: {
        id: userid,
      },
    });
    if (!user) {
      res.status(400).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (e: any) {
    return { error: "internal server error" };
  }
}

export async function getUserByUserName(username: string): Promise<userResult> {
  try {
    const user = await db.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user) {
      return { error: "No user found" };
    }
    return { user };
  } catch (e: any) {
    return { error: "Internal server error" };
  }
}

export async function createUser(
  req: Request,
  res: Response
): Promise<userResult> {
  try {
    const { username } = req.body;
    const userRes = await getUserByUserName(username);
    if (userRes.user) {
      return { error: "User already exists" };
    }
    fixUserRequestData(req);
    const data = req.body;
    const user = await db.user.create({
      data: data,
    });

    return { user };
  } catch (e: any) {
    console.log(e);
    return { error: "internal server error" };
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { username, preferences } = req.body;
    fixUserRequestData(req);
    console.log(req.body);
    const data = req.body;
    const user = await db.user.update({
      where: { username: username },
      data: {
        ...data,
        preferences: preferences
          ? {
              upsert: {
                create: preferences,
                update: preferences,
              },
            }
          : undefined,
      },
      include: {
        preferences: true,
      },
    });
    res.status(200).json(user);
  } catch (e: any) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
}

function fixUserRequestData(req: Request) {
  const { password } = req.body;
  const data = req.body;
  if (password) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    data.password = hash;
  }
  const gender =
    parseInt(req.body.gender, 10) === 0 ? Gender.Male : Gender.Female;
  data.gender = gender;
}
