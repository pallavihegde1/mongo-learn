const mongoose = require('mongoose');

//connect to a mongo db database
mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('connected to mongo db'))
  .catch(err => console.error('could not connect to mongo db'));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],// it will stored as key value pairs key is index and values will be these strings
  date: { type: Date, default: Date.now}, // if we need to specify default values
  isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema);

//create
async function createCourse() {
  const course = new Course({
    name: 'node course',
    author: 'mosh',
    tags: ['node', 'mongoose'],
    isPublished: true
  })

  const result = await course.save();
  console.log(result)
}

createCourse()


// read all

async function getCourses() {
  const courses = await Course.find().sort({name: 1})
  console.log(courses)
}

getCourses()

async function getFilteredCourses() {
  const courses = await Course.find({author: 'mish', isPublished: true})
  const courseByPrice = await Course.find({price: {$gte: 10, lte: 20}})
  console.log('filtered Courses', courses)
  console.log('Courses by Price', courses)
}

getFilteredCourses()
