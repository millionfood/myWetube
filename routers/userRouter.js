import express from "express";
import { getChangePassword, getUserEdit, postChangePassword, postUserEdit, userDetail } from "../controller/userController";
import { uploadAvatar } from "../middleware";
import routes from "../router";


const userRouter = express.Router();

userRouter.get(routes.userDetail(),userDetail)
userRouter.get(routes.userEdit(),getUserEdit)
userRouter.post(routes.userEdit(),uploadAvatar,postUserEdit)

userRouter.get(routes.changePassword(),getChangePassword)
userRouter.post(routes.changePassword(),postChangePassword)


export default userRouter;
