const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { EmiModel } = require("../model/Emi.model");

const EmiRouter = express.Router();

// USER LOGIN ROUTE
EmiRouter.post("/calculate-emi", async (req, res) => {
  const { loanAmount, annualInterestRate, tenureMonts, } = req.body;
  


  try {
    const user = await EmiModel.findOne({ email: email });
    if (user) {
        
      
    } else {
      res.status(500).send({ msg: "Wrong Credintials..!" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = {
  EmiRouter,
};
