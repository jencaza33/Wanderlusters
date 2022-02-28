const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = "12345";
const generateToken = function (user) {
  var token = jwt.sign({ userId: user.user_id }, JWT_SECRET_KEY, {
    expiresIn: "10d",
  });
  return token;
};

// module.exports= {generateToken}

const decodeToken = function (token) {
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
    return decodedToken.userId;
  } catch (error) {
    console.error(error);
    return null;
  }
};

//validatToken and get the user_id from the token.
const validateToken = function (req, res, next) {
  const authorization = req.headers["authorization"].split(" ");
  if (!authorization) {
    return res.status(400).send({ message: "Invalid Token!" });
  }
  const token = authorization[1];
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
    req.user_id = decodedToken.userId;
    // console.log("user_id", req.user_id);
    next();
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: "Access Denied!" });
  }
  // console.log("authorization", authorization);
  // console.log("token", token);
};

module.exports = { generateToken, decodeToken, validateToken };
