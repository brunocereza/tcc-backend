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
      res.status(200).send(retorno);
    } else {
      res.status(404).send("RFID não encontrado");
    }
  } else {
    res.status(412).send("RFID OBRIGATORIO");
  }
});

route.get("/mockData", async (req: Request, res: Response): Promise<any> => {
  const mock = [
    {
      id: Math.random().toString(),
      data: "2022-11-09 23:19",
      quantidade: 11.15,
    },
    {
      id: Math.random().toString(),
      data: "2022-11-08 08:29",
      quantidade: 130,
    },
    {
      id: Math.random().toString(),
      data: "2022-10-07 07:34",
      quantidade: 30,
    },
    {
      id: Math.random().toString(),
      data: "2022-05-03 00:45",
      quantidade: 100,
    },
    {
      id: Math.random().toString(),
      data: "2022-11-10 03:19",
      quantidade: 35.12,
    },
  ];
  res.status(200).json(mock);
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
