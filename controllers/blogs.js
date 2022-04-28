const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
//const middleware = require('./utils/middleware')
//const jwt = require('jsonwebtoken')
blogsRouter.get('/', (request, response) => {
  Blog
    .find({}).populate('user', { username: 1, name: 1 })
    .then(blogs => {
      response.json(blogs)
    })
})


blogsRouter.post('/',  async (request, response) => {
  const body= request.body
  if(!request.token || !request.token.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(request.token.id)
  const blog = new Blog({
   
    title: body.title,
    author: body.author,
    likes: body.likes || 0,
    url: body.url,
    user: user._id  
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  const result = await Blog.findById(savedBlog._id).populate(
    'user', {username: 1, name: 1
    })
  response.status(201).json(result)
})

/*blogsRouter.delete('/:id', async (request, response) => {
  if(!request.token || !request.token.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})
*/
blogsRouter.delete('/:id', async (request, response) => {

  if(!request.token || !request.token.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = await Blog.findById(request.params.id)

  const user = await User.findOne({ username: request.token.username })
  

  if (blog.user.toString() === user.id.toString()) {

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()

  } else {
    
    response.status(401).end()
  } 
  
})


blogsRouter.put('/:id', async (request, response) => {
  if(!request.token || !request.token.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const body = request.body
  
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, name: 1 })
  response.json(updatedBlog)
  
})
  

module.exports = blogsRouter