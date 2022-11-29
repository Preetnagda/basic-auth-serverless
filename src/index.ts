import { config } from "dotenv";
import * as dynamo from "dynamodb";
config();

import app from "./app";

const PORT = process.env.PORT || 8000;

app.listen(PORT, (): void => {
  console.log(`Server Running here 👉 http://localhost:${PORT}`);
});
