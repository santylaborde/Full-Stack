const dummy = (blogs) => {
  return 1
}

const totalLikes = blogs => {
  
  // Accumulative likes
  const likes = (sum, item) => {
    return sum + item.likes
  }

  const value= blogs.reduce(likes, 0)
  return value
}

const favoriteBlog = blogs => {
  
  favorite= blogs.reduce( (prev, current) => {return prev.likes > current.likes ? prev : current} )
  return favorite
}

const mostBlogs = blogs => {
  
  const _ = require('lodash');

  const authorArray= blogs.map(blog => blog.author)
  authorMostBlogs= _.chain(authorArray).countBy().toPairs().maxBy(_.last).head().value(); //find the most commonly occurring tag value
  return {author: authorMostBlogs, blogs: authorArray.filter(author => author===authorMostBlogs).length}
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}