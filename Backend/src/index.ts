import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import dotenvexpand from "dotenv-expand";
import gameRouter from "./game/game.router";
import userRouter from "./user/user.router";
import { createUser, fetchUserByUserName } from "./user/user.service";
import { jwtDecode } from "jwt-decode";
import bcrypt from "bcrypt";
import seedDB from "./game/game.seed";
import { Prisma, PrismaClient, User } from "@prisma/client";

seedDB();

export default bcrypt;

dotenvexpand.expand(dotenv.config());

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api/games", gameRouter);
app.use("/api/users", userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.get("/api/match", async (req: Request, res: Response) => {

});

app.post("/api/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const userRes = await fetchUserByUserName(username);
        if (userRes.error) {
            return res.status(401).json({ error: userRes.error });
        }
        if (userRes.accessToken) {
            const user: User = jwtDecode(userRes.accessToken);

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: "Invalid username or password" });
            }
        }
        return res.status(200).json({ accessToken: userRes.accessToken });
    } catch (error: any) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/api/signup", async (req: Request, res: Response) => {
    try {
        const userRes = await createUser(req, res);

        if (!userRes.accessToken) {
            return res.status(401).json({
                error: userRes.error,
                emailError: userRes.emailError,
                usernameError: userRes.usernameError,
            });
        }

        if (userRes.accessToken) {
            return res.status(201).json({ accessToken: userRes.accessToken });
        } else {
            return res.status(500).json({ error: "Unknown error" });
        }
    } catch (error: any) {
        console.error("Error in signup:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
