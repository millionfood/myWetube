import express from "express";
import { addComment, deleteComment, registerView } from "../controller/videoController";
import routes from "../router";

const apiRouter = express.Router()

apiRouter.post(routes.addComment,addComment)
apiRouter.post(routes.deleteComment,deleteComment)
apiRouter.post(routes.registerView,registerView)

export default apiRouter;
