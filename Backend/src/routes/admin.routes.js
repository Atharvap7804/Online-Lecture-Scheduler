const express = require('express');
const router = express.Router();
const { createCourse, getCourses } = require('../controllers/course.controller');
const { getInstructors, addInstructor } = require('../controllers/user.controller');
const { assignLecture } = require('../controllers/schedule.controller');
const { getAuthParams } = require('../controllers/imagekit.controller');

// Course routes
router.post('/courses', createCourse);
router.get('/courses', getCourses);

// Instructor routes
router.get('/instructors', getInstructors);
router.post('/instructors', addInstructor);

// Schedule assignment route
router.post('/schedules', assignLecture);

// ImageKit authentication route
router.get('/imagekit-auth', getAuthParams);

module.exports = router;