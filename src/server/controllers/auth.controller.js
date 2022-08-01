const config = require("../auth.config");
const db = require("../models");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    fullname: req.body.fullname
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      res.send({ message: "User was registered successfully!" });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      res.status(200).send({
        id: user._id,
        username: user.username,
        fullname: user.fullname,
        accessToken: token
      });
    });
};

exports.getuser = (req, res) => {
  const token = req.headers.authorization.substring(7);
  let userId;
  jwt.verify(token, config.secret, async function(err, decoded) {
    if (err) {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    } else {
      userId = decoded.id;
      const userData = await User.findById(userId);
      return res.status(200).send({
          id: userData._id,
          username: userData.username,
          fullname: userData.fullname,
          accessToken: token
        });
    }
});
}