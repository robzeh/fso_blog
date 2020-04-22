const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/api/blogs", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogRouter.post("/api/blogs", async (request, response) => {
  const blog = new Blog(request.body);

  const savedBlog = await blog.save();
  response.json(savedBlog.toJSON());
});

module.exports = blogRouter;
