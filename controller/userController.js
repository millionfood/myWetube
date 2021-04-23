import passport from "passport";
import User from "../models/users";
import routes from "../router";

export const getJoin = (req,res) =>{
    res.render("join",{pageTitle:'join'})
}

export const postJoin = async(req,res,next) =>{
    const {body:{username:name,email,password,password2}} = req;
    if(password != password2){
        req.flash("error","password is not match")
        res.status(400);
        res.render('join')
    }else{
        try{
            const user = await User({
                name,
                email
            })
            await User.register(user,password)
            next();
            req.flash("success","Success Join")
        }catch(error){
            res.redirect(routes.join)
        }
    }
}

export const getLogin = (req,res) =>{
    res.render("login",{pageTitle:'login'})
}


export const postLogin = passport.authenticate("local",{
    failureRedirect :routes.login,
    successRedirect: routes.home,
    successFlash:"Welcome",
    failureFlash:"Can't log in. Check email and/or password"
})

export const logout = (req,res) =>{
    req.logout()
    req.flash("info","Goodbye")
    res.redirect(routes.home)
}

export const userDetail = async(req,res) =>{
    const {params:{id}} = req
    const userModel = await User.findById(id).populate("videos")
    res.render("userDetail",{pageTitle:'userDetail',userModel})
}
export const getUserEdit = (req,res) =>{
    res.render("userEdit",{pageTitle:'editProfile'})
}

export const postUserEdit = async(req,res) =>{
    const {body:{username,email},params:{id}}= req;
    try{
        await User.findOneAndUpdate({_id:id},{
            name:username,
            avatarUrl: req.file ? req.file.path : req.user.avatarUrl
        })
        req.flash("success","Success Edit Profile")
    }catch(error){
        req.flash("error","Can't Edit Profile")
        console.log(`error:${error}`)
    }
    res.redirect(`${routes.user}${routes.userDetail(id)}`)
}

export const getChangePassword = (req,res) => {
    res.render("changePassword",{pageTitle:'changepassword'})
}

export const postChangePassword = async(req,res) => {
    const {body:{oldPassword,newPassword,checknewPassword}} = req;
    try{
        if(newPassword != checknewPassword){
            req.flash("error","Passwords Are Not Match")
            res.redirect(`${routes.user}${routes.changePassword(req.user.id)}`)
            return;
        }
        await req.user.changePassword(oldPassword,newPassword)
        res.redirect(`${routes.user}${routes.userDetail(req.user.id)}`)
    }catch(error){
        req.flash("error","Can't Change Password")
        res.redirect(`${routes.user}${routes.changePassword(req.user.id)}`)
    }
}
