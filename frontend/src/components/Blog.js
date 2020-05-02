import React from "react";

const Blog = ({ blog, increaseLikes, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div>{blog.author}</div>
      <div>{blog.url}</div>
      <div>
        {blog.likes} likes
        <button onClick={increaseLikes}>Like</button>
      </div>
      <button onClick={removeBlog}>Delete</button>
    </div>
  );
};

export default Blog;
