let Users = require("../data/models/userSchema");
const jwt = require("jsonwebtoken");
const asyncwrapper = require("../middelwares/asyncWrapper");
const bcrypt = require("bcrypt");
let httpStatus = require("../utils/utils");
const { validationResult } = require("express-validator");
const appError = require("../utils/appError");
const generateToken = require('../utils/generateToken');
const allowedTo = require('../middelwares/allowedto');
const getallUsers = asyncwrapper(async (req, res, next) => {
  const allUsers = await Users.find({}, { "__v": false, "password": false, "token": false });
  res.json({ status: httpStatus.success, data: { allUsers } })
})

const register = asyncwrapper(async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const error = appError.create(result, 400, httpStatus.fail);
    return next(error);
  }
  const { firstName, lastName, email, password ,role} = req.body;  
  const oldUser =  await Users.findOne({ email: email }, { "__v": false })  
  if (oldUser) {
    const error  = appError.create('USER HAS ALREADY REGISTED',400,httpStatus.error)
    return next(error)
  }
  // password hashing
  const hashedPassword = await bcrypt.hash(password, 5);
  // generate token
  //  create new user


  const newUser = new Users({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    avatar:req.file.filename
  })
  payload = {
    email,
    _id: newUser._id,
    role
  }
  newUser.token = generateToken(payload,{expiresIn:"10m"});
  await newUser.save()
  res.send({
    status: httpStatus.success, data: { user: newUser} });
    })
  
  const login = asyncwrapper(async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const error = appError.create(result, 400, httpStatus.fail);
    return next(error);
  }
  const user = await Users.findOne({email:req.body.email }, { "__v": false });
  if (!user) {
    const error = appError.create(
      "USER not registed",
      400,
      httpStatus.error
    );
    return next(error);
  }
  const payload =  {
    email: user.email,
      _id: user.id,
      role:user.role
  }
    const matchedPassword = await bcrypt.compare(req.body.password, user.password);
    if(user && matchedPassword){
      const token = generateToken(payload, { expiresIn: "10m" });
    res.send({ status: httpStatus.success, data: { token } });
  } else {
    const error = appError.create("Check your password & email", 400, httpStatus.error);
    return next(error);
  }
})

module.exports = {
  getallUsers,
  register,
  login
};
















