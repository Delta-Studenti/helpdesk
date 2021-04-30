import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("session_token", ["sessionToken"], { unique: true })
@Index("access_token", ["accessToken"], { unique: true })
@Entity("sessions", { schema: "helpdesk" })
export class Sessions {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("timestamp", {
    name: "expires",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  expires: Date;

  @Column("varchar", { name: "session_token", unique: true, length: 255 })
  sessionToken: string;

  @Column("varchar", { name: "access_token", unique: true, length: 255 })
  accessToken: string;

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
}
