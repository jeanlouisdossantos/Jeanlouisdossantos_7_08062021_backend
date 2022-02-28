const Like = require("../models/likemodel");
const sequelize = require("sequelize");
const res = require("express/lib/response");

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
    .catch((error) => {
      res.status(500).json({ message: erclearror });
    });
};

exports.getAllLikes = (req,res,next) => 

{
  if (!req.params.postid) {
  return res.status(400).json({ error: "bad request" });
}
  Like.findAll({ where: { postid: req.params.postid } })
    .then((likes)=>{ res.status(200).json({like : likes})})
    .catch(error => res.status(500).json({message : error}))
};
