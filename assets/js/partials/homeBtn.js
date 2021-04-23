const home = document.querySelector(".home_wrapper")
let homeBtnContainer
let homeBtn

const btnHandler = (e) =>{
    const targetBtn = e.target;
    Array.from(homeBtn).forEach(e=>e.classList.add("hide"))
    targetBtn.classList.remove("hide")
}

const init = () =>{
    
    Array.from(homeBtn).forEach(e=>e.addEventListener("click",btnHandler))
}

if(home){
    homeBtnContainer = document.querySelector(".home_channel_tabs_texts");
    homeBtn = homeBtnContainer.querySelectorAll("a");
    init()
}