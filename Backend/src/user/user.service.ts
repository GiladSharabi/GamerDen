import { PrismaClient } from "@prisma/client";
import { User } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "..";
import jwt from "jsonwebtoken";

const saltRounds = 10;

const db = new PrismaClient();

type UserResult = {
  user?: User;
  error?: string;
  usernameError?: string;
  emailError?: string;
  accessToken?: string;
  existError?: string;
};

export async function fetchUserByUserName(username: string) {
  try {
    const user = await db.user.findUnique({
      where: { username },
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
      return { existError: "No user found" };
    }

    return { user };
  } catch (error: any) {
    return { error: "Internal server error" };
  }
}

export async function getUserByUsername(req: Request, res: Response) {
  const { username } = req.params;
  try {
    const userRes = await fetchUserByUserName(username);
    if (userRes.existError) {
      res.status(200).json({ existError: userRes.existError });
      return;
    }

    const { user } = userRes;
    if (user) {
      const accessToken = jwt.sign(user, process.env.JWT_SECRET_TOKEN as string);
      res.status(200).json({ accessToken: accessToken });
      return;
    }
    res.status(404).json({ existError: "User does not exist" });
  } catch (error: any) {
    res.status(500).json({ error: error });
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

    fixCreateUserData(userData);

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
    return { error: "Internal server error" };
  }
}

function fixCreateUserData(userData: any) {
  const { password } = userData;
  if (password) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    userData.password = hash;
  }

}

export async function updateUser(req: Request, res: Response) {
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

    const updatedUser = await updateUserInDatabase(username, userData, preferences);
    const accessToken = jwt.sign(updatedUser, process.env.JWT_SECRET_TOKEN as string);

    res.status(200).json({ accessToken: accessToken });
  } catch (error: any) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateUserInDatabase(username: string, userData: any, preferences: any) {
  return await db.user.update({
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
}
