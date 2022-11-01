import { dbConnection } from "../../db/data-source";
import { Rfid } from "../../model/RfidModel";

class RfidController {
  public async verifyRfid(rfid: string): Promise<string> {
    const rfidRepository = dbConnection.getRepository(Rfid);
    const retorno = await rfidRepository.findOneBy({
      rfid: rfid,
    });
    if (retorno?.nome) {
      return retorno.nome;
    }
    return;
  }
}

export const rfid = new RfidController();
