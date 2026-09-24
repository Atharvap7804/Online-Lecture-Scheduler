const Course=require('../models/Course.model')

exports.createCourse=async(req,res)=>{
  try {
    const { name, level, description, image } = req.body;
    const course = new Course({ 
      name, 
      level, 
      description, 
      image 
    });
    await course.save();
    res.status(201).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

