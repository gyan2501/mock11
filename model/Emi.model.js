const { default: mongoose } = require("mongoose");
const monngoose = require("mongoose");

const EmiSchema = mongoose.Schema(
  {
    loanAmount: Number,
    annualInterestRate: Number,
    tenureMonts: Number,
  },
  {
    versionKey: false,
  }
);

const EmiModel = mongoose.model("emi", EmiSchema);

module.exports = {
  EmiModel,
};
