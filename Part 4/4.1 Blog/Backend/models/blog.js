const mongoose = require('mongoose')

// schema define
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: {
    type: Number,
    default: likesValidator
  }
})

// function that validates the likes
function likesValidator(number) {
  console.log("HOLAAAAAAA")
  if(!number.likes){ number.likes= 0 }
  console.log("Number.likes", number.likes) // ME QUEDE ACA, TENGO QUE HACER EL INCISO 4.11
  return number.likes
}

// schema transform
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)