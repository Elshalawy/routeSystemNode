let course = require("../data/models/coursesSchema");
const asyncwrapper = require('../middelwares/asyncWrapper')
let httpStatus = require('../utils/utils')
const { validationResult } = require("express-validator");
const appError = require('../utils/appError');
const asyncWrapper = require("../middelwares/asyncWrapper");
let getCourses = asyncWrapper( async(req, res) => {
  let limit = req.query.limit || 10;
  let page = req.query.page || 1;
  const skip  = (page - 1) * limit
  const courses = await course.find({},{"__v":false}).limit(limit).skip(skip);
  res.json({
    status: httpStatus.success,
    data: {
      courses
    },
  });
})
let getCourseById = asyncwrapper(async (req, res,next) => {
  let one = await course.findById(req.params.id);
  if (!one) {
    const error = appError.create("Course not found",404,httpStatus.fail)
    return next(error)
  }
    res.json({
      status: httpStatus.success,
      data: {
        one 
      }
    })
  }
)
let addCourse = asyncwrapper(async(req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = appError.create(errors.array(), 400, httpStatus.fail);
    return next(error);
  } 
  const addOne = new course(req.body)
  await addOne.save()
    res.status(201).json({
      status: httpStatus.success,
      data: {
        addOne,
      },
    });
})
let updateCourse = asyncwrapper(async (req, res) => {
  let newCourse = await course.updateOne({ _id: req.params.id }, { ...req.body });
    res.json({
      status: httpStatus.success,
      data: {
        newCourse,
      },
    });
})
  
let deleteCourse = asyncwrapper(async(req, res) => {
  const DeletedOne = await course.deleteOne({ _id: req.params.id });
    res.json({
      status: httpStatus.success,
      data: {
        DeletedOne,
      },
    });
  })
module.exports = {
  getCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse
}