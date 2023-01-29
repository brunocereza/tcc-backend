import { dbConnection } from "../../db/data-source";
import { Rfid } from "../../model/RfidModel";

class RfidController {
  public async verifyRfid(rfid: string): Promise<Rfid> {
    const rfidRepository = dbConnection.getRepository(Rfid);
    const retorno = await rfidRepository.findOneBy({
      rfid: rfid,
    });
    if (retorno) {
      return retorno;
    }
    return;
  }
}

export const rfidController = new RfidController();
