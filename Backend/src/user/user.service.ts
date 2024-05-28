import { Gender, User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express';

const bcrypt = require('bcrypt');

const db = new PrismaClient();

export type userResult = {
    error?: String,
    user?: User,
}

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
        res.status(400).json({ user });
    } catch (e: any) {
        console.log("Error retrieving user:", e);
        return { error: "internal server error" };
    }
}

export async function getUserByUserName(username: string): Promise<userResult> {
    try {
        const user = await db.user.findUnique({
            where: {
                username: username,
            }
        });
        if (!user) {
            return { error: "No user found" };
        }
        return { user };
    } catch (e: any) {
        console.log("Error retrieving user:", e);
        return { error: "Internal server error" };
    }
}

export async function createUser(req: Request, res: Response): Promise<userResult> {
    try {
        const { username, password } = req.body;
        const userRes = await getUserByUserName(username);
        if (userRes.user) {
            return { error: "User already exists" };
        }
        const gender = parseInt(req.params.gender, 10) === 0 ? Gender.Male : Gender.Female;
        const data = req.body;
        data.gender = gender;
        data.password = bcrypt.hashSync(password, 10);
        const user = await db.user.create({
            data: data,
        });

        return { user };
    } catch (e: any) {
        console.log("Error creating user:", e);
        return { error: "internal server error" };
    }
}

export async function updateUser(req: Request, res: Response) {
    try {
        const { username, preferences, password } = req.body;
        const gender = parseInt(req.params.gender, 10) === 0 ? Gender.Male : Gender.Female;
        const data = req.body;
        data.gender = gender;
        data.password = bcrypt.hashSync(password, 10);
        const user = await db.user.update({
            where: { username: username },
            data: {
                ...data,
                preferences: preferences
                    ? {
                        upsert: {
                            create: preferences,
                            update: preferences
                        }
                    }
                    : undefined,
            }
        });
        res.status(200).json(user);
    } catch (e: any) {
        console.log(`Error: ${e}`);
        res.status(500).json({ error: "Internal server error" });
    }
}