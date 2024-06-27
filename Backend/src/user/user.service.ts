import { Game, PrismaClient } from "@prisma/client";
import { User } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "..";
import jwt from "jsonwebtoken";
import { create } from "domain";

const saltRounds = 10;

const db = new PrismaClient();

type UserResult = {
  error?: string;
  usernameError?: string;
  emailError?: string;
  user?: User;
};

export async function getUserByUserName(username: string): Promise<UserResult> {
  try {
    const user = await db.user.findUnique({
      where: {
        username: username,
      },
      include: {
        preferences: {
          select: {
            region: true,
            voice: true,
            platform: true,
            teammate_platform: true,
            preferred_gender: true,
            min_age: true,
            max_age: true,
            games: true,
          },
        },
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

async function checkExistingUser(userData: any): Promise<UserResult | undefined> {

  const existingUsername = await db.user.findUnique({
    where: { username: userData.username },
  });
  if (existingUsername) {
    return { usernameError: "Username already exists" };
  }

  console.log("wahat userexists");
  const existingEmail = await db.user.findUnique({
    where: { email: userData.email },
  });
  if (existingEmail) {
    return { emailError: "Email already exists" };
  }

  return undefined;
}

export async function createUser(
  req: Request,
  res: Response
): Promise<UserResult> {
  try {
    fixCreateUserData(req);
    const { preferences, ...userData } = req.body;

    const userExistsError = await checkExistingUser(userData);

    if (userExistsError?.usernameError || userExistsError?.emailError) {
      return userExistsError;
    }

    const { games, ...preferencesData } = preferences;

    const createdUser = await db.user.create({
      data: {
        ...userData,
        preferences: {
          create: {
            ...preferencesData,
            games: {
              connect: games,
            },
          },
        },
      },
      include: {
        preferences: {
          select: {
            region: true,
            voice: true,
            platform: true,
            teammate_platform: true,
            preferred_gender: true,
            min_age: true,
            max_age: true,
            games: true,
          },
        },
      },
    });
    console.log("after created");
    return { user: createdUser };

  } catch (error: any) {
    console.error(error);
    return { error: "Internal server error" };
  }
}

function fixCreateUserData(req: Request) {
  const { password } = req.body;
  const data = req.body;
  if (password) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    data.password = hash;
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { preferences, id, iat, ...userData } = req.body;
    const { username, email } = userData;

    const emailExists = await db.user.findUnique({ where: { email } });
    if (emailExists) {
      res.status(400).json({ error: "Email already Exists" });
      return;
    }

    const updatedUser = await db.user.update({
      omit: {
        id: true,
      },
      where: { username },
      data: {
        ...userData,
        preferences: {
          update: {
            ...preferences,
            games: {
              set: [],
              connect: preferences.games.map((game: Game) => ({ id })),
            },
          },
        },
      },
      include: {
        preferences: {
          select: {
            region: true,
            voice: true,
            platform: true,
            teammate_platform: true,
            preferred_gender: true,
            min_age: true,
            max_age: true,
            games: true,
          },
        },
      },
    });

    const accessToken = jwt.sign(updatedUser, process.env.JWT_SECRET_TOKEN as string);

    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}