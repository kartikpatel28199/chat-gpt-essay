import { AppDataSource } from "../../core/database/connection";
import HttpException from "../../core/validations/http-exception";
import { UserRepository } from "../users/user.repository";
import { CreateUserDto } from "./dto/register-user.dto";
import { UsersEntity } from "../users/entities/users.entity";

export class AuthService {
  private userRepository: UserRepository = new UserRepository(AppDataSource);

  /**
   *
   * @param createUserDto
   * @returns
   */
  async registerUser(
    createUserDto: CreateUserDto
  ): Promise<{ error?: HttpException; data?: UsersEntity }> {
    const user = await this.userRepository.getUserByEmail(createUserDto.email);
    if (user) {
      return { error: new HttpException(409, "User already exist") };
    }

    const savedUser = await this.userRepository.createUser(createUserDto);

    return { data: savedUser };
  }
}
