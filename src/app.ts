import { json } from "body-parser";
import cors from "cors";

import container from "./di/inversify.config";
import { InversifyExpressServer } from 'inversify-express-utils';

import "./controller/auth.controller";
import "./controller/hearbeat.controller";

let server = new InversifyExpressServer(container);
server.setConfig((app) => {
  app.use(cors());
  app.use(json());
});

let app = server.build();

export default app;
