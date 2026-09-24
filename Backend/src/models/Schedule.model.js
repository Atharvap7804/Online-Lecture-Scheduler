const mongoose = require('mongoose')

const scheduleSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  batchName: { type: String, required: true },
  date: { type: Date, required: true }
}, { timestamps: true })

scheduleSchema.index({ instructor: 1, date: 1 }, { unique: true })
module.exports = mongoose.model('Schedule', scheduleSchema)
