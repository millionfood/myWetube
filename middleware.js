import routes from "./router";
import multer from "multer";

const uploadV = multer({dest:'uploads/videos/'})
const uploadA = multer({dest:'uploads/avatar/'})

export const localMiddleware = (req,res,next) =>{
    res.locals.routes = routes
    res.locals.user = req.user || null
    res.locals.siteTitle = "Wetube"
    next();
}

export const onlyPublic = (req,res,next) =>{
    if(req.user){
        res.redirect(routes.home)
    }else{
        next();
    }
}

export const onlyPrivate =(req,res,next) =>{
    if(!req.user){
        res.redirect(routes.home)
    }else{
        next();
    }
}

export const uploadVideo = uploadV.single("videoFile")
export const uploadAvatar = uploadA.single("avatarFile")