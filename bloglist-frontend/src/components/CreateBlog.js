import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'
const CreateBlog = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleChange =  (event) => {
    setNewBlogState({ [event.target.name]: event.target.value })
  }
  const setNewBlogState = newBlogData => {
    setNewBlog({ ...newBlog, ...newBlogData })
  }

  const addBlog = async (event) => {
    event.preventDefault()

    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url

    })
    setNewBlog({ title: '', author: '', url: '' })

  }


  return (
    <div >
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input type="text" id= "title" value={newBlog.title} name="title" onChange={handleChange} />
        </div>
        <div>
          author:
          <input type="text" id="author" value={newBlog.author} name="author" onChange={handleChange} />
        </div>
        <div>
          url:
          <input type="text"  id="url" value={newBlog.url} name="url" onChange={handleChange} />
        </div>
        <button type="submit" id="create">create</button>
      </form>
    </div>
  )
}
CreateBlog.propTypes = {
  createBlog: PropTypes.func.isRequired,
}
export default CreateBlog