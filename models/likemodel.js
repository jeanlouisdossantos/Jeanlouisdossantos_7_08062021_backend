const { Sequelize, DataTypes } = require("sequelize");
const user = require("./user");
const post = require("./postmodel");

let sequelize;
if (process.env.JAWSDB_URL) {
  console.log("connected ti prod");
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: "mysql",
      port: 3306,
    }
  );
}

const like = sequelize.define(
  "like",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    postid: {
      type: DataTypes.INTEGER,
      references: {
        model: post,
        key: "postid",
      },
      allowNull: false,
    },
    userid: {
      type: DataTypes.INTEGER,
      references: {
        model: user,
        key: "userid",
      },
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "like ou dislike",
    },
  },
  {
    freezeTableName: true,
    name: {
      singular: "like",
      plural: "like",
    },
    timestamps: false,
  }
);

module.exports = like;
