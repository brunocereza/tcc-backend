class Buscar {
  public returnDefalt(id?: number): buscaDTO {
    if (!id) {
      return null;
    }
    return obj;
  }
}

type buscaDTO = {
  nome: string;
  idade: number;
};

const obj: buscaDTO = {
  nome: "BASTIAO",
  idade: 13,
};

export const buscar = new Buscar();
