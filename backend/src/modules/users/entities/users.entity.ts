import { Column, Entity } from "typeorm";
import { AbstractEntity } from "../../../core/abstract.entity";

@Entity("users")
export class UsersEntity extends AbstractEntity {
  @Column({ type: "varchar", name: "name", nullable: false })
  name: string;

  @Column({ type: "varchar", name: "email", nullable: false })
  email: string;

  @Column({ type: "boolean", name: "is_active", nullable: false })
  isActive: boolean;

  @Column({ type: "varchar", name: "password", nullable: false })
  password: string;

  @Column({ type: "varchar", name: "salt", nullable: false })
  salt: string;
}
