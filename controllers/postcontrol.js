const comment = require("../models/commentmodel");
const Post = require("../models/postmodel");
const user = require("../models/user");
const like = require("../models/likemodel");
const sequelize = require("sequelize");

exports.getAllPosts = (req, res, next) => {
  Post.hasMany(comment, { foreignKey: "post_id" });
  Post.hasMany(like, { foreignKey: "postid" });
  Post.belongsTo(user, { foreignKey: "user_id" });
  comment.belongsTo(user, { foreignKey: "user_id" });

  Post.findAll({
    order : sequelize.literal('created_at DESC'),
    include: [
      { model: like, attributes: ["type","userid"] },
      {
        model: comment,
        include: [
          {
            model: user,
            attributes: [
              [
                sequelize.fn(
                  "CONCAT",
                  sequelize.col("name"),
                  " ",
                  sequelize.col("firstname")
                ),
                "user",
              ],
            ],
          },
        ],
      },
    ],
  })
    .then((posts) => {
    res.status(200).json(posts);
    })
    .catch((error) => {
      
      res.status(400).json(error);
    });
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
      { model: like, attributes: ["userid", "type"] },
      {
        model: user,
        
        attributes: [
          [
            sequelize.fn(
              "CONCAT",
              sequelize.col("name"),
              " ",
              sequelize.col("firstname")
            ),
            "user",
          ],
        ],
      },
      // { model: like,  where : {type :"dislike"}, attributes: ["userid"]}
    ],
    

    // ,
    // { model: comment }]
  })
    .then((post) => {
      
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

exports.createOnePost = (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ error: "bad request, no req.body" });
  }

  const post = req.body;
  post.created_at = new Date(Date.now());
  if (post.file === "null") {
    post.imageurl = "";
  } else {
    post.imageurl = `${req.protocol}://${req.get("host")}/img/${
      req.file.filename
    }`;
  }
  post.user_id = res.locals.userID;

  Post.create(post)
    .then(() => res.status(201).json({ message: "created successfully" }))
    .catch((error) => {
      res.status(400).json(error);
    });
};

exports.updateOnePost = (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "bad request" });
  }

  const updatedpost = req.body;

  Post.update(updatedpost, { where: { postid: req.params.id } });
};

exports.deleteOnePost = (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "bad request" });
  }

  const authtodelete = Post.findOne({ where: { postid: req.params.id } })
    .then((post) => post.user_id === res.locals.userID)
    .catch((error) => res.status(500).json(error));

  if (authtodelete||res.locals.isAdmin) {
    Post.destroy({ where: { postid: req.params.id } })
      .then(() => res.status(200).json({ message: "post deleted succesfuly" }))
      .catch((error) => res.status(500).json(error));
  }
};

exports.createOneComment = (req, res, next) => {
  const commentToCreate = req.body;
  commentToCreate.created_at = new Date(Date.now());
  commentToCreate.user_id = res.locals.userID;

  comment
    .create(commentToCreate)
    .then((response) => {
      res.status(201).json({ message: "created successfully" });
    })
    .catch((error) => {
      res.status(400).json({ error: "sommething went wrong" });
    });
};
