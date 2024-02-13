const jwt = require("jsonwebtoken");
const blacklist = require("../blacklist");

const auth = (req, res, next) => {
  // Using Hardcoded Data:
  // const { token } = req.query;
  // if (token == "ak123") {
  //   res.status(200).send({ message: "Movies data..." });
  // } else {
  //   res.status(200).send({ message: "Login first..." });
  // }

  // Using JWT:
  // const {token} = req.query;
  const token = req.query.authorization; // more efficiesnt way of providing token in headers
  if (token) {
    if (blacklist.includes(token)) {
      res.send({ message: "Login again" });
    }
  }
  jwt.verify(token, "masai", (err, decoded) => {
    // console.log(decoded);
    if (decoded) {
      next();
    } else {
      res.status(400).send({ error: err });
    }
  });
};

module.exports = { auth };
