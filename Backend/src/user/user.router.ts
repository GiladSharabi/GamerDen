import { Router } from "express";
import {
    getUserById,
    updateUser,
} from "./user.service";

const userRouter = Router();
userRouter.get("/id/:id", getUserById);
userRouter.post("/update", updateUser);

export default userRouter;