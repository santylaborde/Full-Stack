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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}