import express from "express";
import { getVideoDetail, getVideoEdit, postVideoEdit, videoDelete } from "../controller/videoController";
import { onlyPrivate } from "../middleware";
import routes from "../router";

const videoRouter = express.Router();

videoRouter.get(routes.videoDetail(),getVideoDetail);

videoRouter.get(routes.videoEdit(),onlyPrivate,getVideoEdit);
videoRouter.post(routes.videoEdit(),onlyPrivate,postVideoEdit);

videoRouter.post(routes.videoDelete(),onlyPrivate,videoDelete);


export default videoRouter;
