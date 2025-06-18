const { body } = require("express-validator");

  const validattionSchema =  ()=>{
  return [
        body("title")
          .notEmpty()
          .withMessage("title is required")
          .isLength({ min: 2, max: 20 })
          .withMessage("title must be between 2-20 characters long"),
        body("price")
          .notEmpty()
          .withMessage("price is required")
          .isNumeric()
          .withMessage("price must be a number"),
      ]
}

module.exports = {
  validattionSchema
}
