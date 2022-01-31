const Like = require("../models/likemodel");
const sequelize = require("sequelize");


exports.createOneLike = (req, res, next) => {

  if (!req.body) {
    return res.status(400).json({ error: "bad request, no req.body" });
  }
  const like = req.body;
  
  Like.create(like)
    .then(res.status(201).json({ message: "created succesfully" }))
    .catch((error) => res.status(400).json({ message: error }));
};
exports.deleteOneLike = (req, res, next) => {
  
  if (!req.body) {
    return res.status(400).json({ error: "bad request, no req.body" });
  }
  const like = req.body;
  
  Like.destroy({
    where: { postid: like.postid, userid: like.userid, type: like.type },
  })
    .then(res.status(200).json({ message: "deleted successfully" }))
    .catch((error) => {res.status(500).json({ message: error })});
};
