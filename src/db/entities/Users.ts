import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TicketMessages } from "./TicketMessages";
import { Tickets } from "./Tickets";

@Index("email", ["email"], { unique: true })
@Entity("users", { schema: "helpdesk" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("varchar", {
    name: "email",
    nullable: true,
    unique: true,
    length: 255,
  })
  email: string | null;

  @Column("timestamp", {
    name: "email_verified",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  emailVerified: Date;

  @Column("varchar", { name: "image", nullable: true, length: 255 })
  image: string | null;

  @Column("timestamp", {
    name: "created_at",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  createdAt: Date;

  @Column("timestamp", {
    name: "updated_at",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  updatedAt: Date;

  @OneToMany(() => TicketMessages, (ticketMessages) => ticketMessages.author)
  ticketMessages: TicketMessages[];

  @OneToMany(() => Tickets, (tickets) => tickets.author)
  tickets: Tickets[];
}
