const HOME = "/";
const JOIN ="/join";
const LOGIN = "/login";
const LOGOUT =  "/logout";
const SEARCH = "/search";
const UPLOAD = "/upload"


//user
const USER = "/user";
const USERDETAIL = "/:id";
const USEREDIT = "/:id/edit";
const CHANGEPASSWORD = "/:id/changePassword"

//video
const VIDEO ="/video";
const VIDEODETAIL = "/:id";
const VIDEOEDIT = "/:id/edit";
const VIDEODELETE = "/:id/delete";

//api
const API = "/api"
const ADDCOMMENT = "/:id/addComment";
const DELETECOMMENT = "/:id/deleteComment"
const REGISTERVIEW = "/:id/registerView"


const routes = {
    home:HOME,
    join:JOIN,
    upload:UPLOAD,
    login:LOGIN,
    logout:LOGOUT,
    search:SEARCH,
    user:USER,
    userDetail(id){
        if(id){
            return `/${id}`
        }else{
            return USERDETAIL
        }
    },
    userEdit(id){
        if(id){
            return `/${id}/edit`
        }else{
            return USEREDIT
        }
    },
    video:VIDEO,
    videoDetail(id){
        if(id){
            return `/${id}`
        }else{
            return VIDEODETAIL
        }
    },
    videoEdit(id){
        if(id){
            return `/${id}/edit`
        }else{
            return VIDEOEDIT
        }
    },
    videoDelete(id){
        if(id){
            return `/${id}/delete`
        }else{
            return VIDEODELETE
        }
    },
    changePassword(id){
        if(id){
            return `/${id}/changePassword`
        }else{
            return CHANGEPASSWORD
        }
    },
    api:API,
    addComment:ADDCOMMENT,
    deleteComment:DELETECOMMENT,
    registerView:REGISTERVIEW
}

export default routes