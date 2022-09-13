import * as express from "express";
import * as cors from "cors";
import { Router, Request, Response } from "express";
import routes from "../rotas/index";
const app = express();

app.use(
  cors({
    origin: "http:localhost:3000",
  })
);

app.use(express.json());

app.use(routes);

app.listen(3333, () => "server running on port 3333");
