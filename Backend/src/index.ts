import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import dotenvexpand from "dotenv-expand";
import gameRouter from "./game/game.router";
import userRouter from "./user/user.router";
import { createUser, getUserByUserName } from "./user/user.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import seedDB from "./game/game.seed";

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

app.get("/api/login", authenticateToken, async (req: Request, res: Response) => {
    const { user } = req.body;
    if (!user) {
        res.status(400).json({ error: "unknown user error" });
    }
    res.status(200).json(user);
});

app.get("/api/match", async (req: Request, res: Response) => {

});

app.post("/api/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const userRes = await getUserByUserName(username);
        if (userRes.error) {
            return res.status(401).json({ error: userRes.error });
        }
        if (!userRes.user) {
            return res.status(500).json({ error: "unknown error" });
        }
        const user = userRes.user;
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        const accessToken = jwt.sign(user, process.env.JWT_SECRET_TOKEN as string);
        return res.json({ accessToken: accessToken });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/api/signup", async (req: Request, res: Response) => {
    try {
        const userRes = await createUser(req, res);
        const userExistsError = userRes.emailError || userRes.usernameError || userRes.error;

        if (userExistsError) {
            return res.status(401).json({
                error: "User exists error",
                emailError: userRes.emailError,
                usernameError: userRes.usernameError,
            });
        }

        if (!userRes.user) {
            return res.status(500).json({ error: "Unknown error" });
        }

        const user = userRes.user;
        return res.status(201).json({ user });
    } catch (error) {
        console.error("Error in signup:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});


function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ error: "Token is required" });
    }
    jwt.verify(token, process.env.JWT_SECRET_TOKEN as string, (err: jwt.VerifyErrors | null, user: any) => {
        if (err) {
            return res.status(403).json({ error: "Token is invalid" });
        }
        req.body.user = user;
        next();
    });
}
