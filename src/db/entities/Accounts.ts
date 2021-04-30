import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("compound_id", ["compoundId"], { unique: true })
@Index("provider_account_id", ["providerAccountId"], {})
@Index("provider_id", ["providerId"], {})
@Index("user_id", ["userId"], {})
@Entity("accounts", { schema: "helpdesk" })
export class Accounts {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "compound_id", unique: true, length: 255 })
  compoundId: string;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("varchar", { name: "provider_type", length: 255 })
  providerType: string;

  @Column("varchar", { name: "provider_id", length: 255 })
  providerId: string;

  @Column("varchar", { name: "provider_account_id", length: 255 })
  providerAccountId: string;

  @Column("text", { name: "refresh_token", nullable: true })
  refreshToken: string | null;

  @Column("text", { name: "access_token", nullable: true })
  accessToken: string | null;

  @Column("timestamp", {
    name: "access_token_expires",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  accessTokenExpires: Date;

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
