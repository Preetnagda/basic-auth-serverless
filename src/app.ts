import express, { Request, Response, Application, NextFunction } from "express";
import { json } from "body-parser";
import cors from "cors";

import AppRouter from "./routes/router";

const app: Application = express();

app.use(cors());
app.use(json());

app.use("/api", AppRouter);

app.get("/heartbeat", (req: Request, res: Response): void => {
  res.send({});
});

// error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).send(err.message);
});

export default app;
