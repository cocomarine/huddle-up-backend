const config = require('../../config/auth.config');
const { User } = require('../models');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // creating user with encrypted password
  User.create({
    first_name: firstName,
    last_name: lastName,
    email: email.toLowerCase(),
    password: bcrypt.hashSync(password, 8)
  })
    .then(res.send({ 
      // message: "User is registered succesfully!",
      // user_data: req.body,
    }))
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  // finding user with the same email address in the database
  User.findOne({
    where: {
      email: email.toLowerCase()
    }
  })
    .then((user) => {
      // when user of matching email not found, error message returned
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }

      // when user of matching email found, 
      // compare the password with stored encrypted password 
      const passwordIsValid = bcrypt.compareSync(
        password,
        user.password
      );
      
      // if passwords don't match, error message returned
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Credentials!"
        });
      }

      // if passwords do match, a login token is generated which expires in 24 hours
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        accessToken: token,
        message: `Welcome to HuddleUp, ${user.first_name}! Let's get together!`
      });
    })
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });
};