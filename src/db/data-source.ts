import { DataSource } from "typeorm";
import { Pessoa } from "../model/PessoaModel";

export const dbConnection = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin",
  database: "tcc",
  synchronize: true,
  logging: false,
  entities: [Pessoa],
  subscribers: [],
  migrations: [],
});
