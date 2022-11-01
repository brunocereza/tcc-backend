import express from "express";
import cors from "cors";
import { Router, Request, Response } from "express";
import "reflect-metadata";
import { dbConnection } from "./db/data-source";
import { buscaDTO, pessoa } from "./controller/buscar/BuscarController";
import { rfid } from "./controller/rfid/rfidController";
import { STATUS_CODES } from "http";
import { log } from "console";
const app = express();

const route = Router();
app.use(cors());

app.use(express.json());

route.get("/buscar", async (req: Request, res: Response): Promise<buscaDTO> => {
  const nome = req.query.nome as string;
  const resultado = await pessoa.returnDefault(nome);
  return;
});

route.get("/verifyRfid", async (req: Request, res: Response): Promise<void> => {
  const rfidMqtt = req.query.rfid ?? "";
  if (rfidMqtt) {
    const retorno = await rfid.verifyRfid(String(rfidMqtt));

    if (retorno) {
      res.status(200).json(retorno);
      return;
    }
    res.status(404).json("RFID não encontrado");
    return;
  } else {
    res.status(422).json("RFID É obrigatório");
    return;
  }
});

app.use(route);

app.listen(3333, () =>
  dbConnection
    .initialize()
    .then(() => {})
    .catch((error) => {
      console.log("Erro ao conetar ao banco!", error);
    })
);
