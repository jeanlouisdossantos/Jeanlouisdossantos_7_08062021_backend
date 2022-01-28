const { Sequelize, DataTypes } = require("sequelize");
const user = require("./user");
const post = require('./postmodel')

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
};

const comment = sequelize.define("comment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  post_id: {
    type: DataTypes.INTEGER,
    references: {
      model: post,
      key: 'postid',
    },
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: user,
      key: 'userid',
    }},
 created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    freezeTableName : true,
    name: {
      singular: 'comment',
      plural: 'comment'
  },
    timestamps : false
  }
);

module.exports = comment;
