import { Router } from "express";
import { buscar } from "../controller/buscar/BuscarController";

const routes = Router();
routes.get("/buscar", (req: any, res) => {
  const id: number = req.query.id;
  const result = buscar.returnDefalt(1);

  console.log(result);

  res.send("finalizado");
});
export default routes;
