const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const {Posts, Likes, Users} = require('../models');
const { validateToken } = require("../middlewares/AuthMiddleware");
const multer = require('../middlewares/Multer_Config');

//Get all posts
router.get("/", validateToken, async (req, res) => {
    console.log("posts req user "+ req.user.id);
   const allPosts = await Posts.findAll( {order: [['id', 'DESC']], include: [Likes] }); 
   const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
   res.json({ AllPosts: allPosts, likedPosts: likedPosts });
});

//Get one post by Id
router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk( id );
    res.json(post);
});

//Get all posts posted by one User
router.get('/byuserId/:id', async (req, res) => {
    const id = req.params.id;
    const allPosts = await Posts.findAll( {
        where: { UserId: id},
        include: [Likes],
        order: [['id', 'DESC']]
    } );
    res.json(allPosts);
});

//Post message
router.post("/", multer, validateToken, async (req, res) => {
    let varImage ="";
    console.log("req.body.file : "+ JSON.stringify(req.body.postImage));
    console.log("post req.body"+JSON.stringify(req.body));
    const userid = req.body.id;
    const user = await Users.findOne({where: { id: userid }});
    console.log("post user : "+user.userName);
    if(req.file){
    varImage = `${req.protocol}://${req.get("host")}/images/${req.file.filename}` 
    console.log("post user file : "+varImage);  
    }
    const postMsg = await Posts.create({title: req.body.title, postTextMsg: req.body.postTextMsg, postImage: varImage, userName: user.userName, UserId:user.id});
    await postMsg.save();
    res.json(postMsg);
   
});

//Modifying Message --- Title Part
router.put("/title/:id", validateToken, async (req,res) => {
    console.log("modify title body : "+ JSON.stringify(req.body));
    const newTitle = req.body.newTitle;
    console.log("modify title : "+ newTitle);
    const id = req.params.id;
    console.log("modify id : "+ req.params.id);
    await Posts.update({title: req.body.newTitle} , {where: {id: id}});
    res.json("newTitle : "+newTitle +" PostID "+ id);
});

//Modifying Message --- Message Part
router.put("/postText/:id", validateToken, async (req,res) => {
    const id = req.params.id;
    await Posts.update({ postTextMsg: req.body.newTextMsg }, { where: { id: id } });
     res.json(newTextMsg);
});


//Deleting message
router.delete("/:postId", validateToken, async(req, res) => {
    const postId = req.params.postId;
    console.log("Delete req.body : "+ JSON.stringify(req.body));
    console.log("Delete PostId : "+ postId);
    const user =await Users.findOne({where: { id : req.body.id}})
    console.log("user role view : "+ JSON.stringify(user));
    const post = await Posts.findOne({where: { id: postId }});
    console.log("Delete PostId view : "+ JSON.stringify(post));
    if((req.body.id !== post.UserId) && (user.role !== 1)){
        res.status(400).json({ message: 'Sorry ! You have no rights. You cannot delete others shared  !'});
    }
    else{
        const filename = post.postImage.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            //supprime le post dans le database
            Posts.destroy({where: {id: postId}})
            .then(() => res.status(200).json({ message: 'Post Deleted Successfully !'}))
            .catch(error => res.status(400).json({ error }));
    
    });
    
    }
});

module.exports = router;