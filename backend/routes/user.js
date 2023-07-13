const express = require('express');
const router = express.Router();
const { authenticateUser, isAdmin } = require('../middlewares/authMiddleware');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
  getWishList,
  modifyWishList,
  addToWishList,
  removeFromWishList,
  enrollInCourse,
  getMyCourses,
} = require('../controllers/user');

// get all users
router.get('/', authenticateUser, isAdmin, getAllUsers);

// get wishlist
router.get('/wishlist', authenticateUser, getWishList);

// add to from wishlist
router.put('/wishlist/add/:courseId', authenticateUser, addToWishList);

// remove from wishlist
router.put('/wishlist/remove/:courseId', authenticateUser, removeFromWishList);

// get enrolled courses
router.get('/mycourses', authenticateUser, getMyCourses);

// enroll in a course
router.post('/enroll/:courseId', authenticateUser, enrollInCourse);

// get a user
router.get('/:userId', authenticateUser, isAdmin, getUserById);

// update a user
router.put('/:userId', authenticateUser, isAdmin, updateUser);

// delete a user
router.delete('/:userId', authenticateUser, isAdmin, deleteUser);

// // get own profile
// router.get('/profile/:userId', authenticateUser, getUserProfile);

// // update own profile
// router.put('/profile/:userId', authenticateUser, updateUserProfile);

module.exports = router;
