const User = require('../models/User.model');

exports.getInstructors = async (req, res) => {
  try {
    const instructors = await User.find({ role: 'instructor' });
    res.status(200).json({ success: true, data: instructors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addInstructor = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email, role: 'instructor' });
    await user.save();
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};