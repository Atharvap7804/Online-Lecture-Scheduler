const mongoose=require('mongoose')

const courseSchema=new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, required: true }, // e.g., Beginner, Intermediate, Advanced
  description: { type: String, required: true },
  image: { type: String, required: true } // Image URL
},{timestamps:true})

module.exports=mongoose.model('Course',courseSchema)