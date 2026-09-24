const express=require('express');
const app=express()
const cors=require('cors')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

const adminRoutes = require('./routes/admin.routes')
const instructorRoutes = require('./routes/instructor.routes')


// Routes Mount
app.use('/api/admin', adminRoutes);
app.use('/api/instructor', instructorRoutes);

app.get('/',(req,res)=>{
  res.send('Hello World')
})
module.exports=app