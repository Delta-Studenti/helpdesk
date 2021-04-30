import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("token", ["token"], { unique: true })
@Entity("verification_requests", { schema: "helpdesk" })
export class VerificationRequests {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "identifier", length: 255 })
  identifier: string;

  @Column("varchar", { name: "token", unique: true, length: 255 })
  token: string;

  @Column("timestamp", {
    name: "expires",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  expires: Date;

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
