const Course = require('../models/Course');

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    let cat = req.query.category ? new RegExp(req.query.category, 'i') : '';

    let courses = [];

    if (cat !== '' && req.query.category !== 'all') {
      courses = await Course.find({ category: { $in: [cat] } }).populate(
        'author',
        '_id name profilePic'
      );
    } else {
      courses = await Course.find().populate('author', '_id name profilePic');
    }

    return res.status(200).json(courses);
  } catch (error) {
    console.error('Get all courses error:', error);
    res.status(500).json({
      message: 'An error occurred while fetching courses',
    });
  }
};

// Get all courses of a author
exports.getAuthorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ author: req.params.authorId });

    return res.status(200).json(courses);
  } catch (error) {
    console.error('Get all courses error:', error);
    res.status(500).json({
      message: 'An error occurred while fetching courses',
    });
  }
};

// Get course by ID
exports.getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    // console.log(courseId);
    const course = await Course.findOne({ _id: courseId }).populate('author');
    // console.log(course);
    if (!course) {
      return res.status(404).json({
        message: 'Course not found',
      });
    }
    return res.status(200).json(course);
  } catch (error) {
    console.error('Get course by ID error:', error);
    res.status(500).json({
      message: 'An error occurred while fetching the course',
    });
  }
};

// Create course
exports.createCourse = async (req, res) => {
  try {
    const { title, description, thumbnail, author, price, sections } = req.body;

    const course = await Course.create({
      title,
      description,
      thumbnail,
      author,
      price,
      sections,
    });

    return res.status(201).json({
      message: 'Course created successfully',
      course,
    });
  } catch (error) {
    console.error('Create course error:', error);
    return res.status(500).json({
      message: 'An error occurred while creating the course',
    });
  }
};

// Update course
exports.updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const updates = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(courseId, updates, {
      new: true,
    });
    if (!updatedCourse) {
      return res.status(404).json({
        message: 'Course not found',
      });
    }

    return res.status(200).json({
      message: 'Course updated successfully',
      course: updatedCourse,
    });
  } catch (error) {
    console.error('Update course error:', error);
    return res.status(500).json({
      message: 'An error occurred while updating the course',
    });
  }
};

// Delete course
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      return res.status(404).json({
        message: 'Course not found',
      });
    }

    return res.json({
      message: 'Course deleted successfully',
    });
  } catch (error) {
    console.error('Delete course error:', error);
    return res.status(500).json({
      message: 'An error occurred while deleting the course',
    });
  }
};
