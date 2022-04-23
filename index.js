const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(cors())

morgan.token('type', (req) => {
  return JSON.stringify(req.body)
})
  
app.use(morgan(':method :url :status  :res[content-length] - :response-time ms :type '))
  
let blogs = [
    {
        title: "HTML is easy ",
        author: "Cris",
        url: "https://blog.fr/",
        likes: 25,
        id:1
       
    },
    {
        title: "HTML is easy ",
        author: "Cris",
        url: "https://blog.fr/",
        likes: 25,
        id:2
       
    }
   
  ]
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})
app.get('/api/blogs', (request, response) => {
 response.json(blogs)
})

app.get('/api/blogs/:id', (request, response) => {
    const id = Number(request.params.id)
    const blog = blogs.find(blog => blog.id === id)

    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/blogs/:id', (request, response) => {
    const id = Number(request.params.id)
    blogs= blogs.filter(blog => blog.id !== id)

    response.status(204).end()
})
const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/blogs', (request, response) => {
    const body = request.body
  
    if (!body.content) {
        return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const blog = {
      title: body.title,
      author: body.author,
      url: 'https://blog.fr/',
      likes: 5,
      id: generateId(),
    }
  
    blogs = blogs.concat(blog)
  
    response.json(blog)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)
const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})