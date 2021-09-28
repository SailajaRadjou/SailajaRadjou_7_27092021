const express = require('express');
const router = express.Router();
const {Users} = require('../models');
const bcrypt = require('bcrypt');

router.post("/signup", async (req, res) => {
    const { userName, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            userName: userName,
            password: hash
        });
        res.json("Successfully Registred !");
    });
});

router.post("/login", async (req, res) => {
    const { userName, password } = req.body;
    const user = await Users.findOne({ where: { userName: userName }});
    if(!user) res.json({ error: "User doesn't exist !"});

    bcrypt.compare(password, user.password).then((match) => {
        if(!match) res.json({ error: "Enter Your Password Correctly !"});
    
            res.json("You have just Loggedin !");
    });
});

module.exports = router;