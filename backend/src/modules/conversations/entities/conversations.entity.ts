import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { AbstractEntity } from "../../../core/abstract.entity";
import { UsersEntity } from "../../users/entities/users.entity";

@Entity("conversations")
export class ConversationsEntity extends AbstractEntity {
  @Column({ type: "int", name: "user_id", nullable: false })
  userId!: number;

  @Column({ type: "boolean", name: "is_active", default: true })
  isActive!: boolean;

  @CreateDateColumn({
    name: "start_date",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  startDate!: Date;

  @Column({ name: "end_date", type: "timestamp", default: null })
  endDate!: Date;

  // Relations
  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: "user_id" })
  user!: UsersEntity;
}
