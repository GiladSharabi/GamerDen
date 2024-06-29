import { Router } from "express";
import { updateUser, getUserByUsername } from "./user.service";

const userRouter = Router();
userRouter.post("/update", updateUser);
userRouter.get("/:username", getUserByUsername);

export default userRouter;
