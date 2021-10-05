const express = require('express');
const router = express.Router();
const {Users} = require('../models');
const bcrypt = require('bcrypt');
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

router.post("/signup", async (req, res, next) => {
    const { userName, password } = req.body;
    console.log("signup entered user"+req.body);
    const user = await Users.findOne({ where : {userName: userName}});
    if (user) {
        return res.status(401).json({ message: 'Utilisateur déja existe ! ' });
    } else {
        bcrypt.hash(password, 10).then((hash) => {
          console.log("Signed in User Name : "+userName);
        Users.create({
            userName: userName,
            password: hash
          });
            res.status(201).json({ message: 'Utilisateur Créé !'});
           
        });
    } 
});

router.post("/login", async (req, res, next) => {
    const { username, password } = req.body;
  console.log("Login body:"+ JSON.stringify(req.body));
    const user = await Users.findOne({ where: { userName: username } });
    console.log(user);
    if (!user) {
        return res.status(401).json({ message: 'Utilisateur Non Trouvé ! ' });
        
    }
  
    bcrypt.compare(password, user.password).then((match) => {
      console.log("user.password : " + user.password);
      if (!match) {        
        return res.status(401).json({ message: 'Mot de Passe Incorrect ! ' });         
       }
    else
    {
        const accessToken = sign(
            { userName: user.username, id: user.id },
            'RANDOM_TOKEN_SECRET'
          );
          const username=user.userName;
          req.body.userName=username;
          console.log("username :" + username);
          console.log("req.body.username :" + username);
          console.log("Access Token user.js : "+accessToken);
          res.json({ token: accessToken, userName: username, id: user.id });
          res.json(req.body);
          res.json(req.body.userName);
         next();
    }
     
    }).catch(error => {res.status(500).json({ error })});
  });
  
  router.get("/token", validateToken, async(req, res, next) => {
    console.log("user body : "+ JSON.stringify(req.user));
    const userBody=req.user;
    const user = await Users.findOne({ where: { id: userBody.id } });
    console.log("user logged : "+ JSON.stringify(user));
    res.json(req.user);
    
  });

  router.get("/profileinfo/:id", async(req,res) => {
    const id = req.params.id;
    const profileinfo = await Users.findByPk(id, {attributes: { exclude: ["password"] }});
    res.json(profileinfo);
  });

  router.put("/changepassword", validateToken, async(req,res) => {
    const { oldPassword, newPassword } = req.body;
    console.log(oldPassword);
    console.log(newPassword);
    console.log("req.user.username password: "+req.body.id);
    const user = await Users.findOne({ where : {id: req.body.id}});
    console.log("user passwordfile: "+ JSON.stringify(user));
    bcrypt.compare(oldPassword, user.password).then(async (match) => {
      if (!match) res.json({ error: "Wrong Password Entered !" });
  
      bcrypt.hash(newPassword, 10).then((hash) => {
        Users.update(
          { password: hash },
          { where: { userName: user.userName } }
        );
        res.json("PASSWORD CHANGED SUCCESSFULLY");
      });
    });
  });

router.delete("/:UserId", validateToken, async(req, res) => {
    const userId = req.params.UserId;
    await Users.destroy({
        where: {
            id: userId,
        },
    });
    res.json("User Deleted Successfully");
});

module.exports = router;