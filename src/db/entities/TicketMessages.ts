import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tickets } from "./Tickets";
import { Users } from "./Users";

@Index("FK_ticket_messages_users", ["authorId"], {})
@Index("FK_ticket_messages_tickets", ["ticketId"], {})
@Entity("ticket_messages", { schema: "helpdesk" })
export class TicketMessages {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "messages", length: 3000 })
  messages: string;

  @Column("int", { name: "ticketId" })
  ticketId: number;

  @Column("int", { name: "authorId" })
  authorId: number;

  @Column("timestamp", { name: "created", default: () => "CURRENT_TIMESTAMP" })
  created: Date;

  @ManyToOne(() => Tickets, (tickets) => tickets.ticketMessages, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "ticketId", referencedColumnName: "id" }])
  ticket: Tickets;

  @ManyToOne(() => Users, (users) => users.ticketMessages, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "authorId", referencedColumnName: "id" }])
  author: Users;
}
