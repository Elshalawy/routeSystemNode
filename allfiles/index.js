const express = require('express');
require('dotenv').config();
const httpStatus = require("./utils/utils.js");
const Coursecontrollers = require('./controllers/controllerCourses.js');
const Userscontrollers = require('./controllers/controllerUser.js');
const Coursesroutes = require("./routes/Courses.js");
const Userroutes = require("./routes/user.js");
const path  = require("path")
const cors = require("cors");
const mongoose = require('mongoose');
const uri = process.env.URLSERVER
mongoose.connect(uri).then(() => {
  console.log(`Server mongoodb is started`)
});
const app = express();
app.use(express.json());
app.use(cors()); 
app.use("/api/courses", Coursesroutes);
app.use("/api/users",Userroutes);
app.use('/uploads', express.static(path.join(__dirname, "uploads")));
// =============== IMPORTANT AND CHANGED TO THE LAST VERSION===============
app.all("/*splat", (req, res) => {
  res.status(404).json({ status: httpStatus.error, message:"this resource isn't available"});
});
// =============== IMPORTANT AND CHANGED TO THE LAST VERSION===============
app.use((err,req,res,next) => {
  res.status(err.statusCode || 500).json({status: err.statusText || httpStatus.error,data:err.message})
}) 

  app.listen(process.env.PORT || 4000, () => {
    console.log("Server is listening on port 4000");
  });