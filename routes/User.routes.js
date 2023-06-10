const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/Users.model");

const userRouter = express.Router();

// USER REGISTER ROUTE
userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.send({ msg: "User Already exists! Try to Login..!" });
    }

    bcrypt.hash(password, 5, async (err, hash) => {
      const user = UserModel({ name, email, password: hash });
      user.save();
      res.status(200).send({ msg: "New User Has been Registered..!" });
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// USER LOGIN ROUTE
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.status(500).send({ err: err.message });
        } else if (result) {
          const token = jwt.sign({ authorId: user._id }, "masai");
          res.status(200).send({ msg: "Login Successull..!", token: token });
        } else {
          res.status(500).send({ msg: "Wrong Credintials..!" });
        }
      });
    } else {
      res.status(500).send({ msg: "Wrong Credintials..!" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//GET PROFILE ROUTE
userRouter.get("/profile", async (req, res) => {
  const { authorId } = req.body;

  try {
    const user = await UserModel.findOne({ _id: authorId });

    if (user) {
      const { name, email } = user;
      let profile = {
        email,
        name,
      };
      res.json(profile);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }

  // res.send(200).json(user);
});

//Logout Route
userRouter.post("/logout",(req, res)=>{

  res.status(200).send({msg:"Logout successully..!"})
})

module.exports = {
  userRouter,
};
