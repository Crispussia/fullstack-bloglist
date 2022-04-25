const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, {likes}) => {
    return sum + likes
  }  
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (blog1 , blog2) => {
    return blog1.likes > blog2.likes
      ? {title: blog1.title, author: blog1.author, likes: blog1.likes}
      : {title: blog2.title, author: blog2.author, likes: blog2.likes}
  }
  return blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
  var result = blogs.reduce( (acc, blog) => (acc[blog.author] = (acc[blog.author] || 0)+1, acc), {} )
  var highestVal = Math.max.apply(null, Object.values(result)),
    authorHigh = Object.keys(result).find(function(a) {
      return result[a] === highestVal
    })

  return {
    author: authorHigh,
    blogs: result[authorHigh]  //number of blogs
  }
}


const mostLikes = blogs => {
  
  let authors = blogs.map(blog => blog.author)
 
  let totallikes = new Array(blogs.length).fill(0)
  blogs.map(blog =>
    totallikes[authors.indexOf(blog.author)] += blog.likes
  )

  let index = totallikes.indexOf(Math.max(...totallikes))

  return {
    author: authors[index],
    likes: totallikes[index]
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}