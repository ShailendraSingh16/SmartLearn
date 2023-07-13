const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizeRole,
} = require('../middlewares/authMiddleware');
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getAuthorCourses,
} = require('../controllers/course');
const { getWishList } = require('../controllers/user');

// get all courses
router.get('/', getAllCourses);

// get all courses of an author
router.get('/author/:authorId', getAuthorCourses);

// get course by ID
router.get('/:courseId', getCourseById);

// create course
router.post(
  '/',
  authenticateUser,
  authorizeRole(['author', 'admin']),
  createCourse
);

// update course
router.put(
  '/:courseId',
  authenticateUser,
  authorizeRole(['author', 'admin']),
  updateCourse
);

// delete course
router.delete(
  '/:courseId',
  authenticateUser,
  authorizeRole(['author', 'admin']),
  deleteCourse
);

module.exports = router;
