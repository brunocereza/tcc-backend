import express from "express";
import cors from "cors";
import { Router, Request, Response } from "express";
import "reflect-metadata";
import { dbConnection } from "./db/data-source";
import { buscaDTO, pessoa } from "./controller/buscar/BuscarController";
import { STATUS_CODES } from "http";
import { log } from "console";
const app = express();

const route = Router();
app.use(
  cors({
    origin: "http:localhost:3000",
  })
);

app.use(express.json());

route.get("/buscar", async (req: Request, res: Response): Promise<buscaDTO> => {
  const nome = req.query.nome as string;
  const resultado = await pessoa.returnDefault(nome);
  console.log("result", resultado);
  res.send(resultado);
  return;
});

route.get(
  "/inserir",
  async (req: Request, res: Response): Promise<buscaDTO> => {
    const pessoaParams: buscaDTO = {
      nome: req.query.nome as string,
      idade: Number(req.query.idade),
    };

    const { severity } = await pessoa.insertPessoa(pessoaParams);

    res.send();
    return;
  }
);

app.use(route);

app.listen(3333, () =>
  dbConnection
    .initialize()
    .then(() => {})
    .catch((error) => {
      console.log("Erro ao conetar ao banco!", error);
    })
);
