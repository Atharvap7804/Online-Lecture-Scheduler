const express = require('express');
const router = express.Router();
const { getInstructorSchedule } = require('../controllers/schedule.controller');

router.get('/schedules/:instructorId', getInstructorSchedule);

module.exports = router;