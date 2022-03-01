const User = require("../models/user");
const bcrypt = require("bcrypt");
const cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.getUserDetails = (req, res, next) => {
  User.findOne({ where: { userid: res.locals.userID } })
    .then((user) => {
      delete user.dataValues.email;
      delete user.dataValues.password;
      res.status(200).json(user);
    })
    .catch((erreur) => res.status(500).json(erreur));
};
exports.updateUserDetails = (req, res, next) => {
  let user = {
    name: req.body.name,
    firstname: req.body.firstname,
    birthdate: req.body.birthdate,
    email: req.body.email,
  };

  if (!req.body.name) {
    delete user.name;
  }
  if (!req.body.firstname) {
    delete user.firstname;
  }
  if (!req.body.birthdate) {
    delete user.birthdate;
  }
  if (!req.body.email) {
    delete user.email;
  }
  if (req.body.password) {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        User.update(
          { password: hash },
          { where: { userid: res.locals.userID } }
        )
          .then(() =>
            res.status(201).json({ message: "utilisateur mis à jour" })
          )
          .catch((error) => {
            res.status(500).json({ error, message: "serveur error" });
          });
      })
      .catch((error) => console.log(error));
  }
  User.update(user, { where: { userid: res.locals.userID } })
    .then(() => res.status(201).json({ message: "utilisateur mis à jour" }))
    .catch((error) => {
      res.status(500).json({ error, message: "serveur error" });
    });
};
exports.signIn = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const email = cryptojs.AES.encrypt(
        req.body.email,
        cryptojs.enc.Hex.parse(process.env.CRYPTO_HEX_KEY),
        { mode: cryptojs.mode.ECB }
      ).toString();

      User.create({
        name: req.body.name,
        firstname: req.body.firstname,
        birthdate: req.body.birthdate,
        email: email,
        password: hash,
      })
        .then(() => {
          res.status(201).json({ message: "Création utilisateur OK" });
        })
        .catch((error) => {
          res.status(500).json({ error, message: "deja cree" });
        });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.login = (req, res, next) => {
  const email = cryptojs.AES.encrypt(
    req.body.email,
    cryptojs.enc.Hex.parse(process.env.CRYPTO_HEX_KEY),
    { mode: cryptojs.mode.ECB }
  ).toString();

  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        return res.status(500).json({ error: "login incorrect" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(500).json({ error: "login incorrect" });
          }
          res.status(200).json({
            userId: user.userid,
            token: jwt.sign({ userId: user.userid }, process.env.TOKEN_KEY, {
              expiresIn: "24h", // pas de deconnexion avant 24h
            }),
            isAdmin: user.isAdmin,
          });
        })
        .catch((error) =>
          res.status(500).json({ error, message: "erreur ici" })
        );
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.refreshToken = (req, res, next) => {
  User.findOne({ where: { userid: req.body.id } })
    .then((user) => {
      return res.status(200).json({
        userId: user.userid,
        token: jwt.sign({ userId: user.userid }, process.env.TOKEN_KEY, {
          expiresIn: "600s",
        }),
      });
    })
    .catch((error) => {
      res.status(500).json({ error: "erreur ici" });
    });
};
exports.deleteUser = (req,res,next) => {
  User.destroy({where : {userid : res.locals.userID}}
    
  )
  .then(() => res.status(200).json({ message: "post deleted succesfuly" }))
  .catch(error => console.log(error))
}