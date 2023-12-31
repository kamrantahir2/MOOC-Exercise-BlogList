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

const mostLikes = (blogs) => {
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

module.exports = { dummy, totalLikes, mostLikes };
