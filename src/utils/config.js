import dotenv from "dotenv";
dotenv.config();

// const password = process.env.MONGODB_URI;
const password = process.env.TEST_MONGODB_URI;

export default { password };
