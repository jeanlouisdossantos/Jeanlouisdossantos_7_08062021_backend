const User = require("../models/user");
const bcrypt = require("bcrypt");
const cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken")

exports.getAllUser = (req, res, next) => {
  User
    .findAll()
    .then((users) => res.status(200).json(users))
    .catch((erreur) => res.status(500).json(erreur) );
};

exports.signIn = (req, res, next) => {
  console.log(req.body)
  
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const email = cryptojs.AES.encrypt(
        req.body.email,
        cryptojs.enc.Hex.parse(process.env.CRYPTO_HEX_KEY),
        {
          mode: cryptojs.mode.ECB,
        }
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
        .catch((error) =>
        {
          console.log(error)
          res.status(500).json({ error, message: "deja cree" })
        
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json( error );
    });
};

exports.login = (req, res, next) => {
  const email = cryptojs.AES.encrypt(
    req.body.email,
    cryptojs.enc.Hex.parse(process.env.CRYPTO_HEX_KEY),
    {
      mode: cryptojs.mode.ECB,
    }
  ).toString();

  User.findOne({ where: { email: email } })
    .then((user) => {
      console.log(user)
      if (!user) {
        return res.status(500).json({ error: "login incorrect" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(500).json({ error: "login incorrect" });
          }
          res
            .status(200)
            .json({
              userId: user.userid,
              token: jwt.sign({ userId: user.userid }, process.env.TOKEN_KEY, {
                expiresIn: "600s",
              
              }),
              isAdmin : user.isAdmin
            });
        })
        .catch((error) => res.status(500).json({ error, message : "erreur ici" }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.refreshToken = (req, res, next) => {
  console.log(req.body)
  User.findOne({ where: { userid: req.body.id } })
  .then(user => { 
    return res.status(200).json({userId: user.userid,
    token: jwt.sign({ userId: user.userid }, process.env.TOKEN_KEY, {
      expiresIn: "600s",
    }),});})
  .catch( error => {
    console.log(error)
    res.status(500).json({error : "erreur ici"})})
  


};
