const video = document.querySelector("#recordingVideo");
const btn = document.querySelector("#recordingBtn")

let streamObj;
let mediaRecorder

const download = (e) =>{
    const {data:videoFile} = e
    const link = document.createElement("a");
    link.href = URL.createObjectURL(videoFile)
    link.download ="YourrecordingFile.webm"
    document.body.appendChild(link)
    link.click();
}

const stopRecording =  () =>{
    video.pause()
    video.src  = "../../img/black.png"
    mediaRecorder.stop()
    btn.innerText = "Start Recording"
    btn.removeEventListener("click",stopRecording);
    btn.addEventListener("click",startRecording)
}

const startRecording = () =>{
    video.play()
    btn.innerText = "Stop Recording"
    mediaRecorder =  new MediaRecorder(streamObj)
    mediaRecorder.start()
    mediaRecorder.addEventListener("dataavailable",download)
    btn.addEventListener("click",stopRecording)
}

const getStream = async() =>{
    try{
        const stream = await navigator.mediaDevices.getUserMedia({
            audio:true,
            video:{width:1280, height:640}
        })
        streamObj = stream
        video.srcObject = stream
        video.muted = true 
        startRecording()
    }catch(error){
        console.log(error)
    }finally{
        btn.removeEventListener("click",getStream)
    }
}

const init=()=>{
    btn.addEventListener("click",getStream)
}

if(video){
    init()
}