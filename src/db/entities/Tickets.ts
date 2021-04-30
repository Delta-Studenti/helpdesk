import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TicketMessages } from "./TicketMessages";
import { TicketTags } from "./TicketTags";
import { Users } from "./Users";

@Index("FK_tickets_users", ["authorId"], {})
@Entity("tickets", { schema: "helpdesk" })
export class Tickets {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "title", length: 200 })
  title: string;

  @Column("timestamp", { name: "created", default: () => "CURRENT_TIMESTAMP" })
  created: Date;

  @Column("int", { name: "status", default: () => "'0'" })
  status: number;

  @Column("int", { name: "authorId", nullable: true })
  authorId: number | null;

  @OneToMany(() => TicketMessages, (ticketMessages) => ticketMessages.ticket)
  ticketMessages: TicketMessages[];

  @OneToMany(() => TicketTags, (ticketTags) => ticketTags.ticket)
  ticketTags: TicketTags[];

  @ManyToOne(() => Users, (users) => users.tickets, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "authorId", referencedColumnName: "id" }])
  author: Users;
}
