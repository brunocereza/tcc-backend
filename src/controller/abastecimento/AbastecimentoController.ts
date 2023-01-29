import { dbConnection } from "../../db/data-source";
import { salvarAbastecimento } from "../../dto/types";
import { Consumo } from "../../model/ConsumoModel";
import { historicoController } from "../historico/historicoController";
import { rfidController } from "../rfid/rfidController";

class AbastecimentoController {
  public async salvarAbastecimento(params: salvarAbastecimento): Promise<void> {
    const { id } = await rfidController.verifyRfid(params.rfid);
    const consumoRepository = await dbConnection.getRepository(Consumo);

    try {
      await consumoRepository.insert({
        data_abastecida: params.data_abastecimento,
        id_rfid: id,
        quantidade_abastecida: params.valor_abastecido,
      });
      console.log("inseriu");
    } catch (error) {
      console.log(error, "error ao inserir abastecimento");
      throw 0;
    }
    return;
  }
}

export type buscaDTO = {
  nome: string;
  idade: number;
};

export const abastecimentoController = new AbastecimentoController();
