import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const Wrapper = (props) => {
  const handleTitleChange = (e) => {
    props.state.title = e.target.value;
  };

  const handleAuthorChange = (e) => {
    props.state.author = e.target.value;
  };

  const handleUrlChange = (e) => {
    props.state.url = e.target.value;
  };

  return (
    <Togglable buttonLabel="Add New Blog">
      <BlogForm
        title={props.state.title}
        author={props.state.author}
        url={props.state.url}
        handleTitleChange={handleTitleChange}
        handleAuthorChange={handleAuthorChange}
        handleUrlChange={handleUrlChange}
        onSubmit={props.onSubmit}
      />
    </Togglable>
  );
};

test("Blog form updates parent state and calls onSubmit", () => {
  const addBlog = jest.fn();
  const state = {
    title: "",
    author: "",
    url: "",
  };

  const component = render(<Wrapper onSubmit={addBlog} state={state} />);
  const button = component.getByText("Add New Blog");
  fireEvent.click(button);

  const titleInput = component.container.querySelector(".titleInput");
  const authorInput = component.container.querySelector(".authorInput");
  const urlInput = component.container.querySelector(".urlInput");
  const form = component.container.querySelector("#submitBlog");

  fireEvent.change(titleInput, {
    target: { value: "A new test blog" },
  });
  fireEvent.change(authorInput, {
    target: { value: "Test author" },
  });
  fireEvent.change(urlInput, {
    target: { value: "Google" },
  });
  fireEvent.submit(form);

  expect(addBlog.mock.calls.length).toBe(1);
  expect(state.title).toBe("A new test blog");
  expect(state.author).toBe("Test author");
  expect(state.url).toBe("Google");
  component.debug();
});
