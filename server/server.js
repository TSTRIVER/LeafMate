import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });
import { app } from "./app.js";

const port = process.env.PORT || 4500;

app.listen(port, () => {
  console.log(`LeafMate Server is running on PORT number :- ${port}`);
});
