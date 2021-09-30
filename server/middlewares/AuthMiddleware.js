const { verify } = require("jsonwebtoken");
const {Users} = require('../models');

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  console.log("accessToken auth:"+accessToken);
  
  if (!accessToken) return res.json({ error: "User not logged in!" });

  try {
    const validToken = verify(accessToken, 'RANDOM_TOKEN_SECRET');
    
    console.log("validToken "+JSON.stringify(validToken));
    const userid = validToken.id;
    console.log("validToken.userid "+userid);
    req.user = validToken;
    if (validToken) {
      req.body.id=userid;
      next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };