import { CreateUserDto } from "../auth/dto/register-user.dto";
import * as bcrypt from "bcrypt";
import { LoginUserDto } from "../auth/dto/login-user.dto";
import { prisma } from "../../prisma";
import { Prisma, Users } from "@prisma/client";

export class UserRepository {
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
    return prisma.users.findFirst({ where: { email } });
  }

  /**
   * Create user
   * @param createUserDto
   * @returns
   */
  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    const { email, name, password } = createUserDto;

    const salt = await bcrypt.genSalt();
    const user: Prisma.UsersCreateInput = {
      email,
      name,
      salt,
      password: await this.hashPassword(password, salt),
    };

    const savedUser = await prisma.users.create({ data: { ...user } });
    delete savedUser.salt;
    delete savedUser.password;

    return savedUser;
  }

  /**
   * validate user password
   * @param loginDTO
   * @returns
   */
  async validateUserPassword(loginDTO: LoginUserDto): Promise<Users> {
    const { email, password } = loginDTO;
    const user = await prisma.users.findFirst({ where: { email: email } });
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
  async getUserById(userId: number): Promise<Users> {
    const user = await prisma.users.findUnique({ where: { id: userId } });
    if (user) {
      delete user.password;
      delete user.salt;
    }
    return user;
  }
}
