import dotenv from "dotenv";
dotenv.config();

const password = process.env.MONGODB_URI;

export default { password };
