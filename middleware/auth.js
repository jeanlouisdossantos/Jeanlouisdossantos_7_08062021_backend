const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodeToken = jwt.verify(token, process.env.TOKEN_KEY);
    const userId = decodeToken.userId;
    
    if (req.body.userID && req.body.userID !== userId) {
      throw "userid non valable";
    } else{
  res.locals.isAdmin = User.findOne({ where: { userid: userId } }).then(
    user => user.isAdmin
  )
    res.locals.userID = userId

    next();}
  } catch (error) {
      res.status(401).json({ error: { error } | "echec authentification" });
  }
};