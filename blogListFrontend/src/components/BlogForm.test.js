import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { jest } from "@jest/globals";
import BlogForm from "./BlogForm";

test("Blog can be created correctly", async () => {
  const createBlog = jest.fn();
  const setMessage = jest.fn();
  const setStyle = jest.fn();
  const resetMessage = jest.fn();
  const user = userEvent.setup();

  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "Test URL",
    likes: 301,
    userId: "659d8f5e71aa3c7f1949c99a",
  };

  const { container } = render(
    <BlogForm
      createBlog={createBlog}
      setMessage={setMessage}
      setStyle={setStyle}
      resetMessage={resetMessage}
    />
  );

  screen.debug();

  const titleInput = container.querySelector(".titleInput");
  const authorInput = container.querySelector(".authorInput");
  const urlInput = container.querySelector(".urlInput");
  const likesInput = container.querySelector(".likesInput");

  await user.type(titleInput, blog.title);
  await user.type(authorInput, blog.author);
  await user.type(urlInput, blog.url);
  await user.type(likesInput, "12");

  const submitButton = container.querySelector(".submitButton");

  await user.click(submitButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toEqual(`Test Blog`);
  expect(createBlog.mock.calls[0][0].author).toEqual(blog.author);
});
