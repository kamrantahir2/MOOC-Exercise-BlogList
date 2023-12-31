import _ from "lodash";

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let total = 0;

  blogs.forEach((blog) => {
    total = total + blog.likes;
  });

  return total;
};

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const favourite = blogs.reduce((previous, current) => {
    return current.likes > previous.likes ? current : previous;
  });

  return {
    title: favourite.title,
    author: favourite.author,
    likes: favourite.likes,
  };
};

const mostBlogs = (blogs) => {
  const grouped = _.groupBy(blogs, "author");

  const most = Object.entries(grouped).reduce((previous, current) => {
    return current.length >= previous.length ? current : previous;
  });

  let total = 0;
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].author === most[0]) {
      total = total + 1;
    }
  }

  const newObj = {
    author: most[0],
    blogs: total,
  };

  return newObj;
};

const mostLikes = (blogs) => {
  const grouped = _.groupBy(blogs, "author");

  const arr = Array.from(Object.entries(grouped));

  let most = {
    author: "",
    likes: 0,
  };

  for (let i = 0; i < arr.length; i++) {
    let total = 0;
    for (let j = 0; j < arr[i][1].length; j++) {
      total = total + arr[i][1][j].likes;
      if (total > most.likes) {
        most = {
          author: arr[i][0],
          likes: total,
        };
      }
    }
  }

  return most;
};

export default { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes };
