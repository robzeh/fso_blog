const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

const blogRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");

const mongoUrl = config.MONGODB_URL;
mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error(`Error: ${error.message}`);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;
