import { AppDataSource } from "../../core/database/connection";
import HttpException from "../../core/validations/http-exception";
import { SessionDto } from "../auth/type/authenticated-user.type";
import { UsersEntity } from "./entities/users.entity";
import { UserRepository } from "./users.repository";

export class UserService {
  private readonly userRepository: UserRepository = new UserRepository(
    AppDataSource
  );

  /**
   * Get user information
   * @param sessionDto
   * @returns
   */
  async getUserInformation(
    sessionDto: SessionDto
  ): Promise<{ error?: HttpException; data?: UsersEntity }> {
    const user = await this.userRepository.getUserById(sessionDto.userId);
    if (!user) {
      return { error: new HttpException(409, "User not found") };
    }

    return { data: user };
  }
}
