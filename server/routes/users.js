const express = require('express');
const router = express.Router();
const {Users} = require('../models');
const bcrypt = require('bcrypt');
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
    const { userName, password } = req.body;
    const user = await Users.findOne({ where : {userName: userName}});
    if (user) {
        return res.status(401).json({ message: 'Utilisateur déja existe ! ' });
    } else {
        bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            userName: userName,
            password: hash
          });
        
          res.json("SUCCESS");
        });
    }    
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    const user = await Users.findOne({ where: { username: username } });
  
    if (!user) {
        return res.status(401).json({ message: 'Utilisateur Non Trouvé ! ' });
        
    }
  
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {        
        return res.status(401).json({ message: 'Mot de Passe Incorrect ! ' });         
       }
    else
    {
        const accessToken = sign(
            { username: user.username, id: user.id },
            "importantsecret"
          );
          res.json(accessToken);
    }
     
    }).catch(error => res.status(500).json({ error }))
  });
  router.get("/auth", validateToken, (req, res) => {
    res.json(req.user);
  });

module.exports = router;