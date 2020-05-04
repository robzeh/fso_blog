import React from "react";

const Blog = ({ blog, increaseLikes, removeBlog }) => {
  return (
    <div>
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
