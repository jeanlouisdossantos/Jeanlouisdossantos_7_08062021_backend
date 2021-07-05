const comment = require("../models/commentmodel");
const Post = require("../models/postmodel");
const user = require("../models/user");
const like = require("../models/likemodel");
const sequelize = require("sequelize");

exports.getAllPosts = (req, res, next) => {
  Post.hasMany(comment, { foreignKey: "post_id" });
  Post.hasMany(like, { foreignKey: "postid" });
  Post.belongsTo(user, { foreignKey: "user_id" });

  Post.findAll({ include: [{ model: like, attributes: ["type"] }] }
  )
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => res.status(400).json(error));
};

exports.getOnePost = (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "bad request" });
  }

  Post.hasMany(comment, { foreignKey: "post_id" });
  Post.hasMany(like, { foreignKey: "postid" });
  Post.belongsTo(user, { foreignKey: "user_id" });

  Post.findAll({
    where: { postid: req.params.id },
    include: [
      { model: like, attributes: ["type"] },
      { model: user, attributes : [[sequelize.fn("CONCAT",sequelize.col('name')," ",sequelize.col('firstname')),"user"]] },
      { model: comment },
    ],
  })
    .then(post => {
      console.log(post)
      res.status(200).json(post)})
    .catch((error) => {
      console.log(error)
      res.status(400).json(error)});
};

exports.createOnePost = (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ error: "bad request" });
  }

  const post = req.body;
  post.created_at = DATE.now();
  post.imageurl = `${req.protocol}://${req.get("host")}/img/${
    req.file.filename
  }`;

  Post.create(post)
    .then(res.status(201).json({ message: "created successfully" }))
    .catch(() => res.status(400).json({ error: "sommething went wrong" }));
};

exports.updateOnePost = (req, res, next) => {
  if (!req.params.id) {return res.status(400).json({ error: "bad request"})}

  const updatedpost = req.body

  Post.update(updatedpost,{where: {postid : req.params.id}})
};

exports.deleteOnePost = (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "bad request" });
  }
  Post.destroy({ where: { postid: req.params.id } })
    .then(() => res.status(200).json({ message: "post deleted succesfuly" }))
    .catch((error) => res.status(500).json(error));
};
