import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rfid {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 255,
  })
  rfid: string;

  @Column({
    length: 255,
  })
  nome: string;

  @Column("boolean")
  ativo: boolean;

  @Column("int")
  id_pessoa: number;
}
