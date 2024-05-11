//* Requirements
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')
const Blog = require('../models/blog')
const { forEach } = require('lodash')

//* Initializing the database before tests
beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
  .map(blog => new Blog(blog))
  
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

//* Tests
test('blogs are returned as json', async () => {

  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/) // regex

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blogs unique identifier property is named id', async() => {
  // We get the original blogs
  const blogsAtStart = await helper.blogsInDb()

  // We check each blog in the list has an ID
  for (let blog of blogsAtStart) {

    const resultBlog = await api      
      .get(`/api/blogs/${blog.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(resultBlog.body, blog)
  }
})

test.only('a valid blog can be added ', async () => {
  
  const newBlog = {
    "title": "Best grills for eating asado in Argentina",
    "author": "Luisito Comunica",
    "url": "https://luisito_in_argentina.com/",
    "likes": 14
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  // verify the total number of blogs
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  // verify the content of blogs
  const resultBlog= blogsAtEnd.filter(blog => blog.title === newBlog.title)
  Object.keys(newBlog).forEach(key => assert.deepStrictEqual(resultBlog[0][key], newBlog[key]))
})

after(async () => {
  await mongoose.connection.close()
})