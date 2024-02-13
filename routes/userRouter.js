const express = require("express");
const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  //   res.send("Register Page");
  const { email, password } = req.body;
  try {
    // Store hash in your password DB.
    bcrypt.hash(password, 5, async function (err, hash) {
      const newUser = new UserModel({ email, password: hash });
      await newUser.save();

      res.status(201).json({ message: "New user has been created" });
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// Currently login is not working. It's leading to an error but can't see the error in console.
userRouter.post("/login", async (req, res) => {
  //   res.send("Login Page");
  const { inputEmail, inputPassword } = req.body;
  try {
    const dbUser = await UserModel.findOne({ inputEmail });
    bcrypt.compare(inputPassword, dbUser.password, function (err, result) {
      if (result) {
        // result == true
        const token = jwt.sign({ course: "cap_backend" }, "masai");
        res.status(200).send({ message: "Login successfull", token: token });
      } else {
        res.status(200).send({ message: "register first/ Wrong credentials" });
      }
    });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

module.exports = { userRouter };
