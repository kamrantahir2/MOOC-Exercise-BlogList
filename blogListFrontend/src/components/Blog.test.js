import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

let container;

beforeEach(() => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "Test URL",
    likes: 301,
    user: "659d8f5e71aa3c7f1949c99a",
  };

  container = render(<Blog blog={blog} />).container;
});

test("renders content", () => {
  const div = container.querySelector(".blogTitle");

  expect(div).toHaveTextContent("Title: Test Blog");
});

test("Title and author render for blog", () => {
  const blogTitle = container.querySelector(".blogTitle");
  expect(blogTitle).toHaveTextContent("Title: Test Blog");

  const blogAuthor = container.querySelector(".blogAuthor");
  expect(blogAuthor).toHaveTextContent("Author: Test Author");

  const display = container.querySelector(".display");
  expect(display).toHaveStyle("display: none");
});

test("content is displayed when togglable is clicked", async () => {
  const user = userEvent.setup();

  const button = container.querySelector(".showButton");
  await user.click(button);

  const display = container.querySelector(".display");
  expect(display).toHaveStyle("display: block");
});
