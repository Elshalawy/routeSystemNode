const appError = require('../utils/appError')
const httpStatus = require('../utils/utils');

module.exports = (...roles) => {
  return (req, res, next) => {
    console.log("Current User", req.CurentUser.role);
    
    if (!roles.includes(req.CurentUser.role)) {
      const error = appError.create(
        "You aren't allowed to make this action",
        401,
        httpStatus.fail
      );
      return next(error);
    }
    return next()
  }
}