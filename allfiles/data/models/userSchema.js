const mongoose = require("mongoose");
const validator = require('validator');
const userRoles = require('../../utils/user-roles')
const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required:true
  },
  lastName: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // validate: [validator.isEmail, 'email field is required and valid']
  },
  password: {
    type: String,
    required:true
  },
  token: {
    type: String
  },
  role: {
    type: String,
    enum: [userRoles.ADMIN, userRoles.USER, userRoles.MANAGER],
    default:userRoles.USER
  },
  avatar: {
    type: String,
    default: "../../uploads/profile.jpg"
  }
})

module.exports = mongoose.model("User",schema);


