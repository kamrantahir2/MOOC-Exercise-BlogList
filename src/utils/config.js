import dotenv from "dotenv";
dotenv.config();

const password =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

export default { password };
