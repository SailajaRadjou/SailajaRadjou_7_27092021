const express = require('express');

const router = express.Router();
const {Posts, Likes, Users} = require('../models');
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
    console.log("posts req user "+ req.user.id);
   const allPosts = await Posts.findAll( {order: [['id', 'DESC']], include: [Likes] }); 
   const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
   res.json({ AllPosts: allPosts, likedPosts: likedPosts });
});

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk( id );
    res.json(post);
});

router.get('/byuserId/:id', async (req, res) => {
    const id = req.params.id;
    const allPosts = await Posts.findAll( {
        where: { UserId: id},
        include: [Likes],
    } );
    res.json(allPosts);
});

router.post("/", validateToken, async (req, res) => {
    
    const userid = req.body.id;
    const user = await Users.findOne({where: { id: userid }});
    console.log("post user : "+user.userName);
    console.log("post"+JSON.stringify(req.body));
    
    const postMsg = await Posts.create({title: req.body.title, postTextMsg: req.body.postTextMsg, userName: user.userName, UserId:user.id});
    await postMsg.save();
    res.json(postMsg);
});

router.delete("/:postId", validateToken, async(req, res) => {
    const postId = req.params.postId;
    await Posts.destroy({
        where: {
            id: postId,
        },
    });
    res.json("Post Deleted Successfully");
});

module.exports = router;