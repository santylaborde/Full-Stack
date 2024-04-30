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

module.exports = {
  dummy,
  totalLikes
}