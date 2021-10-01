const express = require('express');
const router = express.Router();
const { Comments } = require('../models');
const { Users } = require('../models')
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/:postId", async (req, res) => {
    const postId = req.params.postId;
    const comments = await Comments.findAll({where: { PostId: postId }});
    res.json(comments);
});

router.post("/", validateToken, async (req, res) => {
    const comment = req.body;
    const userid = req.body.id;
    const user = await Users.findOne({where: { id: userid }});
    console.log("user : "+user.userName);
    const updateComment = await Comments.create({commentBody:comment.commentBody, userName:user.userName, PostId:comment.PostId});
    await updateComment.save();
    res.json(updateComment);
});

router.delete("/:commentId", validateToken, async (req, res) => {
    const commentId = req.params.commentId;
    console.log(commentId);
    await Comments.destroy({
      where: {
        id: commentId,
      },
    });
  
    res.json("DELETED SUCCESSFULLY");
  });


module.exports = router;