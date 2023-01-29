import express from "express";
import cors from "cors";
import { Router, Request, Response } from "express";
import "reflect-metadata";
import { dbConnection } from "./db/data-source";
import { buscaDTO, pessoa } from "./controller/buscar/BuscarController";
import { rfidController } from "./controller/rfid/rfidController";
import { historicoController } from "./controller/historico/historicoController";
import { STATUS_CODES } from "http";
import { log } from "console";
import { abastecimentoController } from "./controller/abastecimento/AbastecimentoController";
import { salvarAbastecimento } from "./dto/types";
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
    const retorno = await rfidController.verifyRfid(String(rfidMqtt));
    if (retorno) {
      res.status(200).send(retorno);
    } else {
      res.status(200).send({ error: "RFID não encontrado" });
    }
  } else {
    res.status(412).send({ error: "RFID OBRIGATORIO" });
  }
});

route.get(
  "/buscaHistorico",
  async (req: Request, res: Response): Promise<any> => {
    const rfid = req.query.rfid ?? "";

    const retorno = await historicoController.buscaHistoricoPorRfid(
      String(rfid)
    );
    res.status(200).json(retorno);
  }
);

route.get(
  "/salvarAbastecimento",
  async (req: Request, res: Response): Promise<any> => {
    const abastecimento = req.query as unknown as salvarAbastecimento;
    const retorno = await abastecimentoController.salvarAbastecimento(
      abastecimento
    );
    // res.status(200).json(retorno);
    res
      .status(200)
      .json({ content: { mensagem: "dados salvos com sucesso!" } });
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
