import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Tags } from "./Tags";
import { Tickets } from "./Tickets";

@Index("FK_ticket_tags_tickets", ["ticketId"], {})
@Index("FK_ticket_tags_tags", ["tagId"], {})
@Entity("ticket_tags", { schema: "helpdesk" })
export class TicketTags {
  @Column("int", { name: "ticketId" })
  ticketId: number;

  @Column("int", { name: "tagId" })
  tagId: number;

  @Column("int", { primary: true, name: "id" })
  id: number;

  @ManyToOne(() => Tags, (tags) => tags.ticketTags, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "tagId", referencedColumnName: "id" }])
  tag: Tags;

  @ManyToOne(() => Tickets, (tickets) => tickets.ticketTags, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "ticketId", referencedColumnName: "id" }])
  ticket: Tickets;
}
