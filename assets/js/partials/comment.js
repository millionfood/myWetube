import axios from "axios";

const form = document.querySelector("#comment_form");
const input = document.querySelector("#comment_input");
const deleteBtn = document.querySelectorAll("#deleteBtn");
const ul = document.querySelector(".video_comment_output_box");
const numberContainer = document.querySelector(".video_comment_number");
const creatorId = document.querySelector("#creatorId");
const userId = document.querySelector("#userId");
let numberSpan


const increaseNumber = () =>{
    numberSpan.innerText = `${parseInt(numberSpan.innerText,10)+1} 개의 Comments`
}

const decreaseNumber = () =>{
    numberSpan.innerText = `${parseInt(numberSpan.innerText,10)-1} 개의 Comments`
}

const paintComment = (value) =>{
    const li = document.createElement("li");
    const span = document.createElement("span")
    li.innerText = value
    span.innerText = "X";
    span.classList.add("button")
    li.appendChild(span)
    ul.prepend(li)
    increaseNumber
}

const sendAddComment = async(comment) =>{
    const videoId = window.location.href.split("/video/")[1]
    const request = await axios({
        url:`/api/${videoId}/addComment`,
        method:"post",
        data:{
            comment
        }
    })
    if(request.status == 200){
        paintComment(comment)
        increaseNumber()
    }
    
}

const deleteHandler = async(e)=>{
    if(creatorId.value==userId.value){
        const commentLi = e.target.closest("li")
        const inputValue = commentLi.querySelector("#commentId").value
        const videoId = window.location.href.split("/video/")[1]
        const request = await axios({
            url:`/api/${videoId}/deleteComment`,
            method:"POST",
            data:{
                comment:inputValue
            }
        })
        if(request.status == 200){
            commentLi.remove()
            decreaseNumber()
        }
    } 
}

const getCommentValue = (e) =>{
    e.preventDefault()
    const value= input.value
    input.value=""
    sendAddComment(value)
}


const init=()=>{
    form.addEventListener("submit",getCommentValue)
    Array.from(deleteBtn).forEach(e=>{e.addEventListener("click",deleteHandler)})
}

if(form){
    numberSpan = numberContainer.querySelector("span") 
    init()
}