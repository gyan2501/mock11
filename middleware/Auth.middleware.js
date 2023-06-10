const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (token) {
    try {
      const decode = jwt.verify(token, "masai");

      if (decode) {
        req.body.authorId = decode.authorId;
        next();
      } else {
        res.send({ msg: "Please Login!" });
      }
    } catch (error) {}
  } else {
    res.send({ msg: "Please Login!" });
  }
};

module.exports = {
  auth,
};
