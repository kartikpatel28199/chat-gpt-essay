import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MessagesEntity } from "./messages.entity";

@Entity("messages_medias")
export class MessagesMediasEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int", name: "message_id", nullable: false })
  messageId!: number;

  @Column({ type: "varchar", name: "media_path", default: null })
  mediaPath!: string;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt!: Date;

  //   Relations
  @OneToOne(() => MessagesEntity)
  message!: MessagesEntity;
}
