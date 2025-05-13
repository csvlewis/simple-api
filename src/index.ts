import express from "express";
import pingRouter from "./routes/ping";

const app = express();
app.use(express.json());

app.use("/ping", pingRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
