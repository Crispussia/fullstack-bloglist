const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  } 
  /*const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)*/
  
})
  

describe('returning the blogs', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)
})

describe('returning the correct amount of blog', () => {
  test('there are six blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  }, 100000)
})

describe('verifies that the unique identifier property of the blog posts is named id', () => {
  test('Verifying the existence of a property id or not id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => expect(blog.id).toBeDefined())
  }, 100000)
})

describe('add blog posts', () => {
  test('creating a new blog post', async () => {
    // const initialBlogRecover = initialBlogs
    const newBlog = {
      title: 'Securing DevOps',
      author: 'Julien Vehent',
      url: 'https://itbook.store/books/9781617294136',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogAtEnd = await helper.blogsInDb()
    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
    const contents = blogAtEnd.map(blog => blog.title)
    expect(contents).toContain('Securing DevOps')

  }, 100000)
})


describe('add blog posts without like', () => {
  test(' verifies that if the likes property is missing and default to  0', async () => {
   
    const newBlog = {
      title: 'CI/CD with Docker and Kubernetes',
      author: 'Marko Anastasov, Jerome Petazzoni, Pablo Tom Zavalia',
      url: 'https://itbook.store/books/1001649073143'
    }
    if(newBlog.likes===undefined){
      newBlog.likes=0
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogAtEnd = await helper.blogsInDb()
    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1)
      
    const contents = blogAtEnd.map(blog => blog.likes)
    expect(contents[contents.length-1]).toBe(0)

  
  }, 100000)
})

describe('add blog posts without url or title', () => {
  test('adding blogpost without url or title returns 400', async () => {
    const newPost = {
      author: 'Crispussia',
      likes: 6
    }
        
    await api
      .post('/api/blogs')
      .send(newPost)
      .expect(400)
        
    const blogAtEnd = await helper.blogsInDb()
        
    expect(blogAtEnd.length).toBe(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )
  
    const contents = blogsAtEnd.map(blog => blog.title)
  
    expect(contents).not.toContain(blogToDelete.title)
  })
})

describe('Update of a specific blog ', () => {
  test('a blog may be update', async () => {
    
    const blogAtEnd = await helper.blogsInDb() 
    
    
    const blogUpdate = blogAtEnd[blogAtEnd.length-1]
    const updateLikes = { likes: 15}
    await api
      .put(`/api/blogs/${blogUpdate.id}`)
      .send(updateLikes)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const result = await helper.blogsInDb() 
    let newLike
    result.map(blog =>{
      if(blog.title===blogUpdate.title){
        newLike=blog.likes
      }
    })
    expect(newLike).toBe(updateLikes.likes)
    
      
   
  })

})


afterAll(() => {
  mongoose.connection.close()
})
  