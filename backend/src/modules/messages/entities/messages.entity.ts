import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { AbstractEntity } from "../../../core/abstract.entity";
import { ConversationsEntity } from "../../conversations/entities/conversations.entity";

@Entity("messages")
export class MessagesEntity extends AbstractEntity {
  @Column({ type: "int", name: "conversation_id" })
  conversationId!: number;

  @Column({ type: "varchar", name: "direction", default: null })
  direction!: string;

  @Column({ type: "text", name: "message", default: null })
  message!: string;

  @Column({ type: "boolean", name: "is_sent", nullable: false })
  isSent!: boolean;

  @Column({ type: "boolean", name: "is_viewed", nullable: false })
  isViewed!: boolean;

  @Column({ type: "timestamp", name: "viewed_at", default: null })
  viewedAt!: Date;

  //   Relations
  @ManyToOne(() => ConversationsEntity)
  @JoinColumn({ name: "conversation_id" })
  conversation!: ConversationsEntity;
}
