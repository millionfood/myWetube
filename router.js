const HOME = "/";
const LOGIN = "/login";
const LOGOUT =  "/logout";
const SEARCH = "/search";


//user
const USER = "/user";
const USERDETAIL = "/user/:id";
const USEREDIT = "/user/:id/edit";

//video
const VIDEO ="/video";
const VIDEODETAIL = "/video/:id";
const VIDEOEDIT = "/video/:id/edit";

const routes = {
    home:HOME,
    login:LOGIN,
    loout:LOGOUT,
    search:SEARCH,
    user:USER,
    userDetail:USERDETAIL,
    userEdit:USEREDIT,
    video:VIDEO,
    videoDetail:VIDEODETAIL,
    videoEdit:VIDEOEDIT
}

export default routes