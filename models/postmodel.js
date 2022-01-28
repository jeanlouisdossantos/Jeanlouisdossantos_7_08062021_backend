const { Sequelize, DataTypes } = require("sequelize");
const user = require("./user");
const comment = require("./commentmodel")
const like = require("./likemodel")

/** code ci dessous commenté pour mise en prod */
// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USERNAME,
//   process.env.DB_PASS,
//   {
//     host: process.env.DB_HOST,
//     dialect: "mysql",
//   }
// );

let sequelize;
if (process.env.JAWSDB_URL) {
  console.log("connected ti prod")
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      port: 3306,
    },
  );
}

const post = sequelize.define(
  "post",
  {
    postid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: user,
        key: "userid",
      },
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageurl: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);





module.exports = post;

