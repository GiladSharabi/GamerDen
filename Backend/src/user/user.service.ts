import { Game, PrismaClient, UserPreferences } from "@prisma/client";
import { Gender, User } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "..";
import { connect } from "http2";
import jwt from "jsonwebtoken";

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
      include: {
        preferences: true,
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
    fixUserRequestData(req);
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
            games: {
              connect: games.map((game: any) => ({ id: game.id })),
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

    return { user: createdUser };
  } catch (error: any) {
    console.error(error);
    return { error: "Internal server error" };
  }
}

async function getCurrentPreferences(userID: number) {
  return await db.userPreferences.findUnique({
    where: { userID },
    include: { games: true },
  });
}

function formatPreferences(preferences: any) {
  if (preferences.games) {
    const { id, userID, ...rest } = preferences;
    return {
      ...rest,
      games: preferences.games.map((game: Game) => ({ id: game.id })),
    };
  }
}

async function updateUserInDatabase(username: string, userData: any, preferencesData: any) {
  return await db.user.update({
    where: { username },
    data: {
      ...userData,
      preferences: {
        update: {
          ...preferencesData,
          games: {
            set: [],
            connect: preferencesData.games,
          },
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

export async function updateUser(req: Request, res: Response) {
  try {
    const { preferences, id, iat, ...userData } = req.body;
    const { username } = userData;
    const preferencesData = formatPreferences(preferences);

    await getCurrentPreferences(id);
    const updatedUser = await updateUserInDatabase(username, userData, preferencesData);
    const accessToken = jwt.sign(updatedUser, process.env.JWT_SECRET_TOKEN as string);

    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}



function fixUserRequestData(req: Request) {
  const { password, preferences } = req.body;
  const data = req.body;
  if (password) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    data.password = hash;
  }
}
