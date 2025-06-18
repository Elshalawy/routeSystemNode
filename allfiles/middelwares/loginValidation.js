const { body } = require("express-validator");

  const validattionlogin =  ()=>{
  return [
    body("password")
      .notEmpty()
      .withMessage("password is required")
      // .isStrongPassword()
      .withMessage("You must add strong password")
      .isLength({ min: 2, max: 20 })
      .withMessage("password must be between 2-20 characters long"),
    body("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
    .withMessage("You must add avild email")
  ];
}

module.exports = {
  validattionlogin,
};
