const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
    console.log('--------------------')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
    console.log('--------------------')
  })

// Schema define
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 9, // the task asks for 8 numbers (but we have also the "-" character)
    required: true,
    validate: [numberValidator, 'Number must be formed of two parts that are separated by -, the first part has two or three numbers and the second part also consists of numbers']
  },
})

// function that validates the phone number format
function numberValidator(number) {

  const regex = new RegExp('^[0-9]{2,3}-{1}[0-9]+$')

  return regex.test(number)
}

// Schema transform
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)