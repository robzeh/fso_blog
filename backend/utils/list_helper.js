const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };

  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (favBlog, blog) => {
    return favBlog.likes > blog.likes ? favBlog : blog;
  };

  return blogs.reduce(reducer, 0);
};

module.exports = { dummy, totalLikes, favoriteBlog };
