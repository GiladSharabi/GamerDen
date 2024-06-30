import { PrismaClient, UserPreferences } from "@prisma/client";
import { User } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "..";
import jwt from "jsonwebtoken";

const db = new PrismaClient();

type AccessTokenResult = {
  accessToken?: string;
  error?: string;
  usernameError?: string;
  emailError?: string;
  userNotFoundError?: string;
};

function createAccessToken(user: User): string {
  return jwt.sign(user, process.env.JWT_SECRET_TOKEN as string);
}

export async function fetchUserByUserName(
  username: string
): Promise<AccessTokenResult> {
  try {
    const user = await db.user.findUnique({
      where: { username },
      include: {
        preferences: {
          include: { games: true },
        },
      },
    });

    if (!user) {
      return { userNotFoundError: "No user found" };
    }

    const accessToken = createAccessToken(user);
    return { accessToken: accessToken };
  } catch (error: any) {
    return { error: "Internal server error" };
  }
}

export async function getUserByUsername(req: Request, res: Response) {
  const { username } = req.params;
  try {
    const userRes = await fetchUserByUserName(username);
    // if (userRes.userNotFoundError) {
    //   res.status(200).json({ userNotFoundError: userRes.userNotFoundError });
    //   return;
    // }

    const { accessToken } = userRes;
    if (accessToken) {
      res.status(200).json({ accessToken: accessToken });
      return;
    }
    res.status(200).json({ existError: "User does not exist" });
  } catch (error: any) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function checkExistingUser(
  userData: any
): Promise<AccessTokenResult | undefined> {
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
): Promise<AccessTokenResult> {
  try {
    const { preferences, ...userData } = req.body;
    const userRes = await checkExistingUser(userData);

    if (userRes?.usernameError || userRes?.emailError) {
      return {
        error: "User already exists",
        usernameError: userRes.usernameError,
        emailError: userRes.emailError,
      };
    }

    encryptPassword(userData);
    const { games, ...preferencesData } = preferences;

    const createdUser = await createUserInDatabase(userData, preferencesData);
    const accessToken = createAccessToken(createdUser);

    return { accessToken: accessToken };
  } catch (error: any) {
    return { error: "Internal server error" };
  }
}

async function createUserInDatabase(
  userData: User,
  preferences: UserPreferences
): Promise<User> {
  return await db.user.create({
    data: {
      ...userData,
      preferences: {
        create: {
          ...preferences,
        },
      },
    },
    include: {
      preferences: {
        include: { games: true },
      },
    },
  });
}

function encryptPassword(userData: User) {
  const { password } = userData;
  if (password) {
    const saltRounds = 10;
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
        where: { email },
      });
      if (existingEmail) {
        res.status(400).json({ emailError: "Email already exists" });
        return;
      }
    }

    const updatedUser = await updateUserInDatabase(
      username,
      userData,
      preferences
    );
    const accessToken = createAccessToken(updatedUser);

    res.status(200).json({ accessToken: accessToken });
  } catch (error: any) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateUserInDatabase(
  username: string,
  userData: any,
  preferences: any
) {
  const { id, userId, ...preferencesOmitID } = preferences;

  return await db.user.update({
    where: { username },
    data: {
      ...userData,
      preferences: {
        delete: true,
        create: {
          ...preferencesOmitID,
          games: {
            connect: preferencesOmitID.games.map((game: any) => ({
              id: game.id,
            })),
          },
        },
      },
    },
    include: {
      preferences: {
        include: {
          games: true,
        },
      },
    },
  });
}
