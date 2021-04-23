import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import passport from "passport"
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "express-flash";
import dotenv from "dotenv";
import { localMiddleware, onlyPrivate } from "./middleware";
import routes from "./router"
import globalRouter from "./routers/globalRouter";
import userRouter from  "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";
import "./passport";

dotenv.config()

const app = express();

app.use(helmet({contentSecurityPolicy:false}))
app.set("view engine","pug")
app.use("/uploads",express.static("uploads"))
app.use("/static",express.static("static"))
app.use("/img",express.static("img"))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL
    })
}))
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());

app.use(localMiddleware);


app.use(routes.home,globalRouter);
app.use(routes.user,onlyPrivate,userRouter);
app.use(routes.video,videoRouter);
app.use(routes.api,apiRouter);


export default app;