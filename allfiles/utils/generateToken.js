const jwt  = require('jsonwebtoken')

module.exports = (payload,option) => {
    const token = jwt.sign(
      payload,
      process.env.SECRETKEY,
        option 
  );
  return token
}