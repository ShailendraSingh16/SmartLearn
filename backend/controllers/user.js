const Course = require('../models/Course');
const User = require('../models/User');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');

    return res.status(200).json(users);
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      message: 'An error occurred while fetching users',
    });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    user.password = undefined;
    res.json(user);
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({
      message: 'An error occurred while fetching the user',
    });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    let updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    updatedUser.password = undefined;

    return res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      message: 'An error occurred while updating the user',
    });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    return res.status(200).json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      message: 'An error occurred while deleting the user',
    });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.userId; // ID of the authenticated user
    const userProfile = await User.findById(userId);

    if (!userProfile) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    // Check if the user requesting the profile is the authenticated user
    if (req.params.userId !== userId) {
      return res.status(403).json({
        message: 'Access denied, you can only access your own profile',
      });
    }

    return res.status(200).json(userProfile);
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      message: 'An error occurred while fetching the user profile',
    });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId; // ID of the authenticated user
    const updates = req.body;
    const { name, email } = updates;

    // Check if the user being updated is the authenticated user
    if (req.params.userId !== userId) {
      return res.status(403).json({
        message: 'Access denied, you can only update your own profile',
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    return res.status(200).json({
      message: 'User profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Update user profile error:', error);
    res.status(500).json({
      message: 'An error occurred while updating the user profile',
    });
  }
};

// Get wishlist
exports.getWishList = async (req, res) => {
  try {
    // console.log(req.user._id);
    const user = await User.findById(req.user._id).populate({
      path: 'wishlist',
      populate: {
        path: 'author',
      },
    });

    return res.status(200).json(user.wishlist);
  } catch (error) {
    console.error('Get all courses error:', error);
    res.status(500).json({
      message: 'An error occurred while fetching courses',
    });
  }
};

// Add to or Remove from wishlist
exports.addToWishList = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id }).populate('wishlist');

    await user.updateOne({ $push: { wishlist: req.params.courseId } });
    return res.status(200).json({
      message: 'Added to wishlist',
    });
  } catch (error) {
    console.error('Get Wishlist error:', error);
    res.status(500).json({
      message: error,
    });
  }
};
// Remove from wishlist
exports.removeFromWishList = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id }).populate('wishlist');

    await user.updateOne({ $pull: { wishlist: req.params.courseId } });
    return res.status(200).json({
      message: 'Removed from wishlist',
    });
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({
      message: error,
    });
  }
};

// enroll course
exports.enrollInCourse = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user._id;

  console.log('course: ', courseId);
  console.log('user: ', userId);

  try {
    // Update user's document with the enrolled courseId
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { enrolledCourses: courseId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update course's document with the enrolled userId
    const course = await Course.findByIdAndUpdate(
      courseId,
      { $push: { enrolledUsers: userId } },
      { new: true }
    );
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    return res.status(200).json({
      message: 'Enrollment successful',
      user,
      course,
    });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    res.status(500).json({
      message: 'An error occurred while enrolling in the course',
    });
  }
};

// get my courses
exports.getMyCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'enrolledCourses',
      populate: {
        path: 'author',
      },
    });

    return res.status(200).json(user.enrolledCourses);
  } catch (error) {
    console.log(error.response);
    return res.status(500).json({
      message: error,
    });
  }
};
