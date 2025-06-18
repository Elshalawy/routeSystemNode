  const jwt = require('jsonwebtoken')
  const appError = require("../utils/appError")
const httpStatus = require("../utils/utils");

const verifyToken = (req, res, next) => {  
  const headers = req.headers["authorization"] || req.headers["Authorization"];
  if (!headers) {
    let error = appError.create(
      "You must be logined user",
      401,
      httpStatus.error
    );
    return next(error);
  }
    const token = headers.split(" ")[1];  
      const valid_token = jwt.verify(token,process.env.SECRETKEY);
      if (!valid_token) {
        let error = appError.create(
          "Not valid token",
          401,
          httpStatus.error
        );
        return next(error)
      }
  req.CurentUser = valid_token;  
    next()
  }

module.exports = verifyToken