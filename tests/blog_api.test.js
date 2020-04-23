const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");

const api = supertest(app);

describe("API Tests", () => {
  const JEST_TIMEOUT = 40000;

  beforeEach(async () => {
    await Blog.deleteMany({});
    const blogObjects = helper.blogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);
  });

  describe("GET Tests", () => {
    test(
      "Blogs returned as JSON",
      async () => {
        await api
          .get("/api/blogs")
          .expect(200)
          .expect("Content-Type", /application\/json/);
      },
      JEST_TIMEOUT
    );

    test(
      "Unique identifier id exists",
      async () => {
        const response = await api.get("/api/blogs");
        response.body.forEach((blog) => {
          expect(blog.id).toBeDefined();
        });
      },
      JEST_TIMEOUT
    );
  });

  describe("POST Tests", () => {
    test(
      "New blog saves to db correctly",
      async () => {
        const newBlog = {
          title: "Integrating Prettier + ESLint + Airbnb Style Guide in VSCode",
          author: "Jeffrey Zhen",
          url:
            "https://blog.echobind.com/integrating-prettier-eslint-airbnb-style-guide-in-vscode-47f07b5d7d6a",
          likes: 6,
        };

        await api
          .post("/api/blogs")
          .send(newBlog)
          .expect(201)
          .expect("Content-Type", /application\/json/);

        const blogsAtEnd = await helper.blogsInDB();
        expect(blogsAtEnd.length).toBe(helper.blogs.length + 1);
      },
      JEST_TIMEOUT
    );

    test(
      "New blog without likes defaults to 0",
      async () => {
        const newBlog = {
          title: "Integrating Prettier + ESLint + Airbnb Style Guide in VSCode",
          author: "Jeffrey Zhen",
          url:
            "https://blog.echobind.com/integrating-prettier-eslint-airbnb-style-guide-in-vscode-47f07b5d7d6a",
        };

        const savedBlog = await api
          .post("/api/blogs")
          .send(newBlog)
          .expect(201)
          .expect("Content-Type", /application\/json/);

        expect(savedBlog.body.likes).toBe(0);
      },
      JEST_TIMEOUT
    );

    test(
      "New blog without title and url returns 400",
      async () => {
        const newBlog = {
          author: "Jeffrey Zhen",
          likes: 6,
        };

        await api.post("/api/blogs").send(newBlog).expect(400);
      },
      JEST_TIMEOUT
    );
  });

  describe("DELETE Tests", () => {
    test(
      "Delete a blog",
      async () => {
        // const blogs = await helper.blogs;
        await api.delete(`/api/blogs/${helper.blogs[0].id}`).expect(204);
      },
      JEST_TIMEOUT
    );
  });

  describe("PUT Tests", () => {
    test("Update blog likes", async () => {
      const blogs = await helper.blogsInDB();
      const newLikes = 1337;
      const updatedBlog = await api
        .put(`/api/blogs/${blogs[0].id}`)
        .send({ likes: newLikes })
        .expect(200);

      expect(updatedBlog.body.likes).toBe(newLikes);
    });
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
