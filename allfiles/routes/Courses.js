const express = require("express");
const router = express.Router();
const handlers = require("../controllers/controllerCourses.js");
const { validattionSchema } = require("../middelwares/validationscema.js");
const verifyToken = require("../middelwares/verifyToken.js");
const user_roles = require('../utils/user-roles');
const allowedTo = require('../middelwares/allowedto.js')
console.log(user_roles);

router
  .route("/")
  .get(handlers.getCourses)
  .post(validattionSchema(), handlers.addCourse);
router
  .route("/:id")
  .get(handlers.getCourseById)
  .patch(handlers.updateCourse)
  .delete(verifyToken,allowedTo(user_roles.ADMIN,user_roles.MANAGER),handlers.deleteCourse);

module.exports = router;
