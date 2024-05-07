//* Requirements
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')
const Blog = require('../models/blog')

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

test.only('blogs unique identifier property is named id', async() => {
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

after(async () => {
  await mongoose.connection.close()
})