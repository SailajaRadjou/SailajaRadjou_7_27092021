const express = require('express');
const router = express.Router();
const {Users} = require('../models');
const bcrypt = require('bcrypt');

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
      res.json("YOU LOGGED IN!!!");
    }).catch(error => res.status(500).json({ error }))
  });


module.exports = router;