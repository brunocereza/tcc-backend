import * as express from "express";
import cors from "cors";
import { Router, Request, Response } from "express";

const app = express();

const route = Router();
app.use(
  cors({
    origin: "http:localhost:3000",
  })
);

app.use(express.json());

route.get("/", (req: Request, res: Response) => {
  console.log("nha");

  return res.json({ message: "diabaria" });
});

app.use(route);

app.listen(3333, () => "server running on port 3333");
