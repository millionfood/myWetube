import express from "express";
import routes from "./router"
import globalRouter from "./router/globalRouter";
import userRouter from  "./router/userRouter";
import videoRouter from "./router/videoRouter";

const app = express();


app.use(routes.home,globalRouter)
app.use(routes.user,userRouter)
app.use(routes.video,videoRouter)


export default app;