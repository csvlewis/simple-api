import { createApp } from "./app";

const PORT = process.env.PORT || 3000;
const app = createApp();

console.log("Starting server...");
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
