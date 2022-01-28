const { Sequelize, DataTypes } = require("sequelize");
const post = require("./postmodel")

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const user = sequelize.define(
  "User",
  {
    userid: {
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
        
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    isAdmin:{
      type : DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue : false,
    }
  },
  {
    tableName: "user",
    timestamps: false
  }
  
);

post.belongsTo(user, {foreignKey : "user_id"})

module.exports = user;
