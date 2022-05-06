import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog,addLike,deleteBlogList,user }) => {
  const [visibility, setVisibility] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const deleteStyle = {
    background: 'blue',
    borderRadius: '25px',
    color: 'black',
  }


  const changeVisibility=() => setVisibility((visibility===true)?false:true)

  return (
    <div style={blogStyle}>
      <div  className='blog'>
        {blog.title} {blog.author}
        <button type="text" id="view"  value={visibility} onClick={changeVisibility}>
          {visibility === false?'view':'hide'}
        </button>
        <br/>

        {(visibility===true)&&
        <span >
          {blog.url }
          <br/>
          likes {blog.likes}
          <button onClick={addLike} id="like"> like </button>
          <br/>
          {blog.user.username}
          <br/>
          {(user.username===blog.user.username)&&
          <button style={deleteStyle} onClick={deleteBlogList} id="remove">remove</button>
          }
        </span>
        }



      </div>
    </div>
  )}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlogList: PropTypes.func.isRequired
}


export default Blog