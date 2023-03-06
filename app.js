import express from "express";
import cors from "cors";
import { request } from "undici";

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());

app.get("/", async (_req, res, next) => {
  try {
    const { body } = await request("http://jsonplaceholder.typicode.com/todos");
    const bodyJson = await body.json();

    res.status(200).json({
      statusCode: 200,
      data: bodyJson,
    });
  } catch (err) {
    next(err);
  }
});

app.use((_err, _req, res, _next) => {
  res.status(501).json({
    statusCode: 501,
    error: "Server crashed, error unhandled yet",
  });
});

app.listen(port, (_) => console.log(`Apps is working at ${port}`));
