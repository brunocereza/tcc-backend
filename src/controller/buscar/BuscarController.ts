import { dbConnection } from "../../db/data-source";
import { Pessoa } from "../../model/PessoaModel";

class PessoaController {
  public async returnDefault(nome: string): Promise<buscaDTO> {
    const pessoaRepository = dbConnection.getRepository(Pessoa);
    const retorno = await pessoaRepository.findOneBy({
      nome: nome,
    });
    return retorno;
  }
}

export type buscaDTO = {
  nome: string;
  idade: number;
};

export const pessoa = new PessoaController();
