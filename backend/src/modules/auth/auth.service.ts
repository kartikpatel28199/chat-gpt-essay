import HttpException from "../../core/validations/http-exception";
import { UserRepository } from "../users/users.repository";
import { CreateUserDto } from "./dto/register-user.dto";
import { JwtService } from "../../core/validations/jwt.service";
import { LoginUserDto } from "./dto/login-user.dto";
import {
  AuthenticatedUserType,
  JwtPayload,
} from "./type/authenticated-user.type";
import { Users } from "@prisma/client";

export class AuthService {
  private userRepository: UserRepository = new UserRepository();
  private jwtService = new JwtService();

  /**
   *
   * @param createUserDto
   * @returns
   */
  async registerUser(
    createUserDto: CreateUserDto
  ): Promise<{ error?: HttpException; data?: Users }> {
    const user = await this.userRepository.getUserByEmail(createUserDto.email);
    if (user) {
      return { error: new HttpException(409, "User already exist") };
    }

    const savedUser = await this.userRepository.createUser(createUserDto);

    return { data: savedUser };
  }

  /**
   * login user
   * @param loginDto
   * @returns
   */
  async loginUser(
    loginDto: LoginUserDto
  ): Promise<{ error?: HttpException; data?: AuthenticatedUserType }> {
    const userByEmail = await this.userRepository.getUserByEmail(
      loginDto.email
    );
    if (!userByEmail) {
      return { error: new HttpException(409, "User not found") };
    }

    const userData = await this.userRepository.validateUserPassword(loginDto);
    if (!userData) {
      return { error: new HttpException(409, "Invalid password") };
    }

    const { accessToken } = await this.generateAccessToken(userData);

    const responseData: AuthenticatedUserType = {
      email: userData.email,
      name: userData.name,
      userId: userData.id,
      accessToken,
    };

    return { data: responseData };
  }

  /**
   * generate access token
   * @param user
   * @returns
   */
  private async generateAccessToken(user: Users) {
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      name: user.name,
    };

    const accessToken = await this.jwtService.signPayload(payload);
    return { accessToken };
  }
}
