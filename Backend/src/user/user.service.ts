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
    const { preferences, ...userData } = req.body;

    const existingUser = await db.user.findUnique({
      where: { username: userData.username },
    });

    if (existingUser) {
      return { error: "User already exists" };
    }

    const { games, ...preferencesData } = preferences;

    const createdUser = await db.user.create({
      data: {
        ...userData,
        preferences: {
          create: {
            ...preferencesData,
            games: undefined,
          },
        },
      },
      include: {
        preferences: true,
      },
    });

    return { user: createdUser };
  } catch (error: any) {
    console.error(error);
    return { error: "Internal server error" };
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
}
