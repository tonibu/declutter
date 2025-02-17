import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cookieParser from "cookie-parser";
import renderMiddleware from "./middleware/render/index.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cookieParser());

app.get(
  "*",
  await renderMiddleware({
    htmlPath: path.resolve(__dirname, "./assets/index.html"),
  }),
);

app.listen(3000, () => console.log("Server running on port 3000"));
