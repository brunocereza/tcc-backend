import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Consumo {
  @PrimaryGeneratedColumn()
  @Index({ unique: true })
  id: number;

  @Column({ type: "timestamp without time zone" })
  data_abastecida: Date;

  @Column({ type: "decimal" })
  quantidade_abastecida: number;

  @Column({ type: "int" })
  id_rfid: number;
}
