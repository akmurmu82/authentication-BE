const express = require("express");
const dotenv = require("dotenv");
const connection = require("./db");
const { userRouter } = require("./routes/userRouter");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth.middleware");
const blacklist = require("./blacklist");

dotenv.config();
// const port = process.env.PORT;
const port = 8080;
console.log(port);

const app = express();

app.use(express.json());
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send({ message: "Welcome to the Server" });
});
app.get("/about", (req, res) => {
  res.send({ message: "About page" });
});

app.get("/movies", auth, (req, res) => {
  res.status(200).send({ message: "Movies data..." });
});

app.get("/series", auth, (req, res) => {
  res.status(200).send({ message: "Series data..." });
});

app.get("/logout", (req, res) => {
  const token = req.body.authorization;
  try {
    blacklist.push(token);
    res.send({ message: "User has been logged out" });
  } catch (error) {
    res.send({ message: error });
  }
});

app.listen(port, async () => {
  try {
    await connection;
    console.log(`Server is up and running on port: ${port}`);
  } catch (error) {
    console.log(error);
  }
});
