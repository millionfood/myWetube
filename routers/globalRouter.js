import express from "express";
import { getJoin, getLogin, postLogin, logout, postJoin } from "../controller/userController";
import { getUpload, home, postUpload, search } from "../controller/videoController";
import { onlyPrivate, onlyPublic, uploadVideo } from "../middleware";
import routes from "../router";


const globalRouter = express.Router();

globalRouter.get(routes.home,home)

globalRouter.get(routes.join,onlyPublic,getJoin);
globalRouter.post(routes.join,onlyPublic,postJoin,postLogin);

globalRouter.get(routes.upload,onlyPrivate,getUpload)
globalRouter.post(routes.upload,onlyPrivate,uploadVideo,postUpload)

globalRouter.get(routes.login,onlyPublic,getLogin)
globalRouter.post(routes.login,onlyPublic,postLogin)

globalRouter.get(routes.logout,onlyPrivate,logout)
globalRouter.get(routes.search,search)



export default globalRouter;
