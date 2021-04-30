import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TicketTags } from "./TicketTags";

@Entity("tags", { schema: "helpdesk" })
export class Tags {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "title", length: 50 })
  title: string;

  @OneToMany(() => TicketTags, (ticketTags) => ticketTags.tag)
  ticketTags: TicketTags[];
}
