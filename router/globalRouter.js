import express from "express";
import { login, logout, search } from "../controller/userController";
import { home } from "../controller/videoController";
import routes from "../router";

const globalRouter = express.Router();

globalRouter.get(routes.home,home)
globalRouter.get(routes.login,login)
globalRouter.get(routes.logout,logout)
globalRouter.get(routes.search,search)



export default globalRouter;
