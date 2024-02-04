import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "Test URL",
    likes: 301,
    user: "659d8f5e71aa3c7f1949c99a",
  };

  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector(".blogTitle");

  expect(div).toHaveTextContent("Title: Test Blog");
});

test("Title and author render for blog", () => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "Test URL",
    likes: 301,
    user: "659d8f5e71aa3c7f1949c99a",
  };

  const { container } = render(<Blog blog={blog} />);

  const blogTitle = container.querySelector(".blogTitle");
  expect(blogTitle).toHaveTextContent("Title: Test Blog");

  const blogAuthor = container.querySelector(".blogAuthor");
  expect(blogAuthor).toHaveTextContent("Author: Test Author");

  const likes = container.querySelector(".likes");
  expect(likes).toBeDefined();

  const display = container.querySelector(".display");
  expect(display).toHaveStyle("display: none");
});
