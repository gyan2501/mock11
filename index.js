const express = require("express");
const { connection } = require("./db");
require("dotenv").config();

const { userRouter } = require("./routes/User.routes");
const { auth } = require("./middleware/Auth.middleware");

const cors = require("cors");

const app = express();

app.use(express.json());
// app.use(cors);
app.use("/users", userRouter);

app.use(auth);


app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB!");
  } catch (error) {
    console.log(error);
    console.log("Not able to connect DB!");
  }
  console.log(`Server is running on port ${process.env.port}!`);
});
