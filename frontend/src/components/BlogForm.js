import React from "react";

const BlogForm = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url,
}) => {
  return (
    <form onSubmit={handleSubmit} className="blogForm">
      <div>
        Title:
        <input
          value={title}
          onChange={handleTitleChange}
          className="titleInput"
        />
      </div>
      <div>
        Author:
        <input
          value={author}
          onChange={handleAuthorChange}
          className="authorInput"
        />
      </div>
      <div>
        URL:
        <input value={url} onChange={handleUrlChange} className="urlInput" />
      </div>
      <button type="submit" id="submitBlog">
        Add Blog
      </button>
    </form>
  );
};

export default BlogForm;
