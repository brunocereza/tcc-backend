import { STATUS_CODES } from "http";
import { MessagePort } from "worker_threads";
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

  public async insertPessoa(pessoaParam: buscaDTO) {
    try {
      const pessoaRepository = dbConnection.getRepository(Pessoa);
      await pessoaRepository.insert({
        idade: pessoaParam.idade,
      });
    } catch (error) {
      return error;
    }

    return;
  }
}

export type buscaDTO = {
  nome: string;
  idade: number;
};

export const pessoa = new PessoaController();
