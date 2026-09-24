const Schedule=require('../models/Schedule.model')

exports.assignLecture=async(req,res)=>{
  try {
    const { courseId, instructorId, batchName, date } = req.body;

    const existingSchedule = await Schedule.findOne({
      instructor: instructorId,
      date: date
    });

    if (existingSchedule) {
      return res.status(400).json({
        success: false,
        message: 'Clash Detected! This instructor is already assigned to a lecture on this date.'
      });
    }

    const schedule = new Schedule({
      course: courseId,
      instructor: instructorId,
      batchName,
      date
    });

    await schedule.save();

    res.status(201).json({
      success: true,
      message: 'Lecture scheduled successfully!',
      data: schedule
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

exports.getInstructorSchedule = async (req, res) => {
  try {
    const { instructorId } = req.params;
    const schedules = await Schedule.find({ instructor: instructorId })
      .populate('course', 'name level description image')
      .populate('instructor', 'name email');

    res.status(200).json({ success: true, data: schedules });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};