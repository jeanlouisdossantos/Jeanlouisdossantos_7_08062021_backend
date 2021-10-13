const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token)
    const decodeToken = jwt.verify(token, process.env.TOKEN_KEY);
    const userId = decodeToken.userId;
    if (req.body.userID && req.body.userID !== userId) {
      throw "userid non valable";
    } else
  
    res.locals.userID = userId
    next();
  } catch (error) {
    res.status(401).json({ error: { error } | "echec authentification" });
  }
};