import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticPath = path.resolve(__dirname, "public");
const app = express();

app.use(express.static(staticPath));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
