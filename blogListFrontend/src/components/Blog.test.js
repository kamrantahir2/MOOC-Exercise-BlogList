import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";
import { jest } from "@jest/globals";

let container;
let update;

beforeEach(() => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "Test URL",
    likes: 301,
    user: "659d8f5e71aa3c7f1949c99a",
  };

  update = jest.fn();

  container = render(<Blog blog={blog} update={update} />).container;
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

test("likes button pressed twiced results in 2  calls", async () => {
  const user = userEvent.setup();
  const showButton = container.querySelector(".showButton");
  await user.click(showButton);

  const likeButton = container.querySelector(".likeButton");
  await user.click(likeButton);
  await user.click(likeButton);

  expect(update.mock.calls).toHaveLength(2);
});
