const Admins = require("../models/admins");
const bcrypt = require("bcryptjs");
const { loginValidation } = require("../functions/validations/auth");
const { createJwtToken, maxAge } = require("../functions/JWT/createJWTtoken");



const loginUser_post = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const validation_result = loginValidation({ username, password });
  const errorMessage = validation_result.error;

  if (errorMessage) {
    res.status(400).json({ message: errorMessage.details[0].message });
  } else {
    try {
      const user = await Admins.findOne({ username });
      if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
          const token = createJwtToken(user._id);
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
          });
          res.status(200).json({ user: user._id });
        } else throw Error("incrorrect password !");
      } else throw Error("incrorrect username !");
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

const loginUser_get = (req, res) => {
  const PageData = {
    title: "لوحة التحكم | تسجيل دخول",
  };
  res.render("./backend/login", PageData);
};

module.exports = {
  loginUser_post: loginUser_post,
  loginUser_get: loginUser_get};
