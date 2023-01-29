import { dbConnection } from "../../db/data-source";
import { Consumo } from "../../model/ConsumoModel";
import { rfidController } from "../../controller/rfid/rfidController";

class HistoricoController {
  public async buscaHistoricoPorRfid(rfid: string): Promise<Consumo[]> {
    const historicoRepository = dbConnection.getRepository(Consumo);

    const { id } = await rfidController.verifyRfid(rfid);

    if (id) {
      return await historicoRepository.findBy({
        id_rfid: id,
      });
    }
    return;
  }
}

export const historicoController = new HistoricoController();
