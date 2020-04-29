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
    <form onSubmit={handleSubmit}>
      <div>
        Title:
        <input value={title} onChange={handleTitleChange} />
      </div>
      <div>
        Author:
        <input value={author} onChange={handleAuthorChange} />
      </div>
      <div>
        URL:
        <input value={url} onChange={handleUrlChange} />
      </div>
      <button type="submit">Add Blog</button>
    </form>
  );
};

export default BlogForm;
