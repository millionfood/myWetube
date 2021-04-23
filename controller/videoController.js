import routes from "../router";
import Video from "../models/video";
import Comment from "../models/comment";

export const home = async(req,res) =>{
    try{
        const videos = await Video.find({}).sort({_id:-1})
        let mainVideo = await Video.find({description:{$regex: "태웅이 화내다"}})
        mainVideo = mainVideo[0]
        res.render('home',{videos,pageTitle:"HOME",mainVideo})
    }catch(error){
        console.log(error)
    }
}

export const search = async(req,res) =>{
    const {query:{search}} = req;
    let video = [];
    try{
        video = await Video.find({title:{$regex:search ,$options:"i"}})
        res.render('search',{video,search,pageTitle:"Search"})
    }catch(error){
        console.log(error)
        res.redirect(routes.home)
    }

}

export const getUpload = (req,res) =>{
    res.render("upload",{pageTitle:"Upload"})
}

export const postUpload = async(req,res) =>{
    const {
            body:{title,description},
            file:{path}
    } =req;
    try{
        const newVideo = await Video.create({
            fileUrl : path,
            title,
            description,
            creator:req.user.id
        })
        req.user.videos.push(newVideo.id)
        req.user.save()
        req.flash("success","Success Upload")
        res.redirect(routes.home)
    }catch(error){
        console.log(`error:${error}`)
        req.flash("error","Can't Upload Video")
    }
}

export const getVideoDetail = async(req,res) =>{
    const {params:{id}} = req;
    const video = await Video.findById(id).populate("creator").populate("comments")
    res.render('videoDetail',{video,pageTitle:"Video Detail"})
}

export const addComment = async(req,res) =>{
    const {params:{id},body:{comment},user} = req
    try{
        const video = await Video.findById(id)
        const commentModel = await Comment.create({
            text:comment,
            creator:user.id
        })
        video.comments.push(commentModel.id)
        video.save()
        req.user.comments.push(commentModel.id)
        req.user.save();
    }catch(error){
        console.log(`error:${error}`)
    }finally{
        res.end()
    }
    
}

export const deleteComment = async(req,res) =>{
    const {body:{comment},params:{id},user} = req;
    try{
        const video = await Video.findById(id)
        const currentCommentNumber = video.comments.indexOf(comment)
        await Comment.findOneAndRemove({_id:comment})
        video.comments.splice(currentCommentNumber,1)
        video.save()
        user.comments.splice(currentCommentNumber,1)
        user.save()
    }catch(error){
        console.log(`error:${error}`)
    }finally{
        res.end()
    }
}

export const getVideoEdit = async(req,res) =>{
    const {params:{id}} = req;
    const video = await Video.findById(id)
    res.render('videoEdit',{video,pageTitle:"Video Edit"})
}

export const postVideoEdit = async(req,res) =>{
    const {params:{id},body:{title,description}} = req;
    try{
        await Video.findOneAndUpdate({_id:id},{title,description})
        req.flash("success","Success Video Edit")
        res.redirect(`/video${routes.videoDetail(id)}`)
    }catch(error){
        console.log(`error:${error}`)
        req.flash("error","Can't Video Edit")
        res.redirect(`/video${routes.videoEdit(id)}`)
    }

}

export const videoDelete = async(req,res) =>{
    const {params:{id}} =req;
    try{
        await Video.findOneAndRemove({_id:id})
        req.flash("success","Success Delete Video")
        res.redirect(routes.home)
    }catch(error){
        console.log(error)
        req.flash("error","Can't Delete Video")
        res.redirect(`/video${routes.videoEdit(video.id)}`)
    }
}

export const registerView = async(req,res) =>{
    const {params:{id}} =req;
    try{
        const video = await Video.findById(id)
        video.views += 1;
        video.save()
        res.status(200)
    }catch(error){
        console.log(`error:${error}`)
        res.status(400)
    }finally{
        res.end()
    }
}