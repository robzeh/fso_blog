import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import TogglableBlog from "./TogglableBlog";
import Blog from "./Blog";

// test("Renders content", () => {
//   const component = render(
//     <TogglableBlog title="Test Blog" author="Robie Gonzales" />
//   );

//   expect(component.container).toHaveTextContent("Test Blog");
// });

describe("TogglableBlog", () => {
  let component;

  const blog = {
    title: "Test Blog",
    author: "Robie Gonzales",
    url: "Google",
    likes: 2,
  };

  const increaseLikes = jest.fn();

  beforeEach(() => {
    component = render(
      <TogglableBlog title={blog.title} author={blog.author}>
        <Blog blog={blog} increaseLikes={increaseLikes} />
      </TogglableBlog>
    );
  });

  test("Only name and author show by default", () => {
    const div = component.container.querySelector(".togglableContent");
    expect(div).toHaveStyle("display: none");
  });

  test("Blog info is shown when button is clicked", () => {
    const button = component.getByText("Show");
    fireEvent.click(button);
    const div = component.container.querySelector(".togglableContent");
    expect(div).not.toHaveStyle("display: none");
    // component.debug();
  });

  test("Clicking like twice calls handler twice", () => {
    const button = component.getByText("Like");
    fireEvent.click(button);
    fireEvent.click(button);

    expect(increaseLikes.mock.calls).toHaveLength(2);
  });
});
