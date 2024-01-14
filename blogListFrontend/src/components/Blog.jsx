const Blog = ({ blog, handleDelete }) => {
  return (
    <>
      <div>Title: {blog.title}</div>
      <div>Author: {blog.author}</div>
      <div>Likes: {blog.likes}</div>
      <div>URL: {blog.url}</div>
      <div>User: {blog.user.name}</div>
      <button onClick={handleDelete}>Delete</button>
      <div>------</div>
    </>
  );
};

export default Blog;
