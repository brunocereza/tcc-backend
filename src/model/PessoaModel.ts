import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 255,
  })
  nome: string;

  @Column("bigint")
  idade: number;
}
