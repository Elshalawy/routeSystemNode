const express = require("express");
const router = express.Router();
const UserHndlers = require("../controllers/controllerUser.js");
const { validattionSchema } = require("../middelwares/registerValidation.js");
const { validattionlogin } = require("../middelwares/loginValidation.js");
const verifyToken = require("../middelwares/verifyToken.js");
const multer = require('multer');
const appError = require("../utils/appError.js");
const httpStatus = require("../utils/utils.js");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,"uploads")
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1]
    const fileName = `user-${Date.now()}.${ext}`;

    
    cb(null,fileName)
  }
})
const fileFilter = (req, file, cb) => {
  const type = file.mimetype.split("/")[0]
  if (type === "image") {
    cb(null,true)
  } else {
    return cb(appError.create("You must add image",400,httpStatus.error),false)
  }
}
const upload = multer({
  storage, fileFilter });
router
  .route("/")
  .get(verifyToken,UserHndlers.getallUsers);
router
  .route("/register")
  .post(upload.single("avatar"),validattionSchema(), UserHndlers.register);
router.route("/login").post(validattionlogin(), UserHndlers.login);  

module.exports = router;
