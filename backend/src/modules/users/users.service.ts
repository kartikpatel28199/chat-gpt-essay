import { Users } from "@prisma/client";
import HttpException from "../../core/validations/http-exception";
import { SessionDto } from "../auth/type/authenticated-user.type";
import { UserRepository } from "./users.repository";

export class UserService {
  private readonly userRepository: UserRepository = new UserRepository();

  /**
   * Get user information
   * @param sessionDto
   * @returns
   */
  async getUserInformation(
    sessionDto: SessionDto
  ): Promise<{ error?: HttpException; data?: Users }> {
    const user = await this.userRepository.getUserById(sessionDto.userId);
    if (!user) {
      return { error: new HttpException(409, "User not found") };
    }

    return { data: user };
  }
}
