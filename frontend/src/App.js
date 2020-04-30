import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import TogglableBlog from "./components/TogglableBlog";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("LoggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      window.localStorage.removeItem("LoggedBlogUser");
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("LoggedBlogUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setMessage(`Welcome ${user.name}!`);
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } catch (exception) {
      setMessage("Wrong credentials");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  const logout = () => {
    window.localStorage.removeItem("LoggedBlogUser");
    setUser(null);
    console.log(window.localStorage);
  };

  const loginFormRef = React.createRef();

  const loginForm = () => (
    <Togglable buttonLabel="Login" ref={loginFormRef}>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  );

  const blogFormRef = React.createRef();

  const blogForm = () => (
    <Togglable buttonLabel="Add New Blog" ref={blogFormRef}>
      <BlogForm
        title={title}
        author={author}
        url={url}
        handleTitleChange={({ target }) => setTitle(target.value)}
        handleAuthorChange={({ target }) => setAuthor(target.value)}
        handleUrlChange={({ target }) => setUrl(target.value)}
        handleSubmit={addBlog}
      />
    </Togglable>
  );

  const showBlogsRef = React.createRef();

  const showBlogs = () =>
    blogs.map((blog) => (
      <TogglableBlog key={blog.id} title={blog.title} ref={showBlogsRef}>
        <Blog key={blog.id} blog={blog} />
      </TogglableBlog>
    ));
  // blogs.map((blog) => <Blog key={blog.id} blog={blog} />);

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title,
      author,
      url,
    };
    blogService.create(blogObject).then((blog) => {
      setBlogs(blogs.concat(blog));
      setTitle("");
      setAuthor("");
      setUrl("");
    });
    setMessage("Added new blog!");
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  return (
    <div>
      <Notification message={message} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>blogs</h2>
          <div>
            {user.name} logged in {""}
            <button onClick={logout}>Logout</button>
          </div>
          <h3>Add a new blog</h3>
          {blogForm()}
          {showBlogs()}
        </div>
      )}
    </div>
  );
};

export default App;
