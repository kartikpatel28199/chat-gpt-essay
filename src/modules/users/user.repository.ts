import { DataSource, Repository } from "typeorm";
import { CreateUserDto } from "../auth/dto/register-user.dto";
import { UsersEntity } from "./entities/users.entity";
import * as bcrypt from "bcrypt";

export class UserRepository {
  private readonly userRepository: Repository<UsersEntity>;

  constructor(private dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(UsersEntity);
  }

  /**
   * Hash password
   * @param password
   * @param salt
   * @returns
   */
  private async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }

  /**
   * Get user by email
   * @param email
   * @returns
   */
  async getUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }

  /**
   * Create user
   * @param createUserDto
   * @returns
   */
  async createUser(createUserDto: CreateUserDto): Promise<UsersEntity> {
    const { email, name, password } = createUserDto;

    const user = new UsersEntity();
    user.name = name;
    user.email = email;
    user.name = name;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    const savedUser = await this.userRepository.save(user);
    delete savedUser.salt;
    delete savedUser.password;

    return savedUser;
  }
}
