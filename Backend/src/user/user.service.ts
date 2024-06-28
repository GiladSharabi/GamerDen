import { Game, PrismaClient } from "@prisma/client";
import { User } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "..";
import jwt from "jsonwebtoken";

const saltRounds = 10;

const db = new PrismaClient();

type UserResult = {
  error?: string;
  usernameError?: string;
  emailError?: string;
  user?: User;
  accessToken?: string;
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
  } catch (error: any) {
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
    const { preferences, ...userData } = req.body;
    const userExistsError = await checkExistingUser(userData);

    if (userExistsError?.usernameError || userExistsError?.emailError) {
      return userExistsError;
    }

    fixCreateUserData(req);

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

export async function updateUser(req: Request, res: Response): Promise<void> {
  try {
    const { preferences, id, iat, ...userData } = req.body;
    const { username, email } = userData;

    const existingUser = await db.user.findUnique({
      where: { username },
    });

    if (!existingUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    if (email !== existingUser.email) {
      const existingEmail = await db.user.findUnique({
        where: { email: userData.email },
      });
      if (existingEmail) {
        res.status(400).json({ emailError: "Email already exists" });
        return;
      }
    }

    const updatedUser = await db.user.update({
      where: { username },
      data: {
        ...userData,
        preferences: {
          update: {
            ...preferences,
            games: {
              set: [],
              connect: preferences.games.map((game: any) => ({ id: game.id })),
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

    res.status(200).json({ user: updatedUser, accessToken });
  } catch (error: any) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
