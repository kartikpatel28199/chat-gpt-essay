import { DataSource, Repository } from "typeorm";
import { CreateUserDto } from "../auth/dto/register-user.dto";
import { UsersEntity } from "./entities/users.entity";
import * as bcrypt from "bcrypt";
import { LoginUserDto } from "../auth/dto/login-user.dto";

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
   * validate password
   * @param password
   * @param salt
   * @param hashPassword
   * @returns
   */
  private async validatePassword(
    password: string,
    salt,
    hashPassword: string
  ): Promise<boolean> {
    const hash = await bcrypt.hash(password, salt);
    return hash === hashPassword;
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

  /**
   * validate user password
   * @param loginDTO
   * @returns
   */
  async validateUserPassword(loginDTO: LoginUserDto): Promise<UsersEntity> {
    const { email, password } = loginDTO;
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (
      user &&
      user.salt &&
      user.password &&
      (await this.validatePassword(password, user.salt, user.password))
    ) {
      return user;
    } else {
      return null;
    }
  }

  /**
   * Get user by id
   * @param userId
   * @returns
   */
  async getUserById(userId: number): Promise<UsersEntity> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user) {
      delete user.password;
      delete user.salt;
    }
    return user;
  }
}
