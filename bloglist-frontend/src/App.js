/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  //const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const blogFormRef =useRef()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const handleLogout = async () => {
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  // add useEffect for local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addLike = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const updateBlog = { ...blog, likes: blog.likes + 1 }

    const newBlog = await blogService.update(id, updateBlog)
    setBlogs(blogs.map(blog => blog.id !== id ? blog: newBlog).sort((blog1, blog) => blog.likes-blog1.likes))
  }

  const addBlog = (blogObject) => {

    try {
      blogFormRef.current.toggleVisibility()
      blogService.create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog ))
        })

      setSuccessMessage(`a new blog added: ${blogObject.title} by ${blogObject.author}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)


    } catch (error) {
      setErrorMessage(error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const deleteBlogId= async (id) => {
    const blog = blogs.find(n => n.id === id)

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)){
      await blogService
        .deleteBlog(id)
        .then(() => {
          setBlogs(blogs.filter((blog) => blog.id !== id))
          setSuccessMessage(
            `Blog '${blog.title}' removed!!`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error)
          setErrorMessage(
            error.message
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <ErrorNotification message={errorMessage}/>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setPassword={setPassword}
          setUsername={setUsername}
	    />

      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <SuccessNotification message={successMessage}/>
      <div>
        <p>{user.name} logged in  <button id="logout" onClick={handleLogout}>Logout</button></p>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <CreateBlog
            createBlog={addBlog}
          />
        </Togglable>
        <br/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} addLike={() => addLike(blog.id)} deleteBlogList={() => deleteBlogId(blog.id)} user={user}/>
        )}
      </div>
    </div>
  )

}

export default App
