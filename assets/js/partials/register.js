const videoContainer = document.querySelector(".video_container");
const video = document.querySelector("video");
const viewsContainer = document.querySelector(".video_views");
let span;


const registerView = async() =>{
    const videoId = window.location.href.split("/video/").[1]
    fetch(`/api/${videoId}/registerView`,{
        method:"post"
    }).then(res=>{
        if(res.status == 200){
            const viewValue = span.innerText
            const viewNumberValue = parseInt(viewValue.split("")[0])
            span.innerText = `${parseInt(viewNumberValue,10) + 1} views`
        }
    })
}

const init = () =>{
    video.addEventListener("ended",registerView)
}

if(videoContainer){
    span = viewsContainer.querySelector("span")
    init()
}