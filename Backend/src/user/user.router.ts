import { Router } from "express";
import { updateUser } from "./user.service";

const userRouter = Router();
userRouter.post("/update", updateUser);

export default userRouter;
