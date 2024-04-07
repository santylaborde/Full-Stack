const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const app= "phoneBook"
const password = process.argv[2]

const url =
  `mongodb+srv://slaborde:${password}@fullstackopen.1mv6ak9.mongodb.net/${app}?retryWrites=true&w=majority&appName=FullStackOpen`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)
const name= process.argv[3]
const number= process.argv[4]

if(process.argv[3]) // CREATE
{
  console.log("Creating contact");

  const person = new Person({
    name: name,
    number: number
  })  
  
  // Create new person
  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
else // GET
{
  console.log("Phonebook:");
  // get persons
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}