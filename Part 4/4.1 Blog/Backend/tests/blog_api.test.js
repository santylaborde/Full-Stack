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

test('a valid blog can be added ', async () => {
  
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

test('0 likes if the property is missing', async () => {
  
  const newBlog = {
    "title": "Best grills for eating asado in Argentina",
    "author": "Luisito Comunica",
    "url": "https://luisito_in_argentina.com/",
    // "likes": 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  // verify the total number of blogs
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  // verify the likes of blogs
  const resultBlog= blogsAtEnd.filter(blog => blog.title === newBlog.title)
  assert.strictEqual(resultBlog[0]["likes"], 0)
})

test('blog with no title, not added', async () => {
  
  // Missing title
  const newBlog = {
    "author": "Luisito Comunica",
    "url": "https://luisito_in_argentina.com/",
    "likes": 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  // verify there is not new blog in the blog list
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

  // The not added is not in the blog list
  const urls = blogsAtEnd.map(r => r.url)
  assert(!urls.includes(newBlog.url))
})

test('blog with no url, not added', async () => {
  
  // Missing url
  const newBlog = {
    "title": "Best grills for eating asado in Argentina",
    "author": "Luisito Comunica",
    "likes": 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  // verify there is not new blog in the blog list
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

  // The not added is not in the blog list
  const titles = blogsAtEnd.map(r => r.title)
  assert(!titles.includes(newBlog.title))
})

after(async () => {
  await mongoose.connection.close()
})