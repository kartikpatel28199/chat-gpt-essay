import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/register-user.dto";
import { validateDto } from "../../core/validations/dto-validation";
import { LoginUserDto } from "./dto/login-user.dto";
import { FastifyReply } from "fastify";
import { Request } from "../../core/types/request.types";

export class AuthController {
  public authService = new AuthService();

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * Register user
   * @param req
   * @param reply
   * @returns
   */
  registerUser = async (req: Request, reply: FastifyReply) => {
    const registerUserDto = new CreateUserDto({ ...(req.body as any) });

    const error = await validateDto(registerUserDto);
    if (error) {
      reply.status(400).send({ error });
      return;
    }

    const result = await this.authService.registerUser(registerUserDto);
    if (result.error) {
      reply.status(result.error.status).send({ error: result.error.message });
      return;
    }

    reply
      .status(201)
      .send({ message: "User registered successfully", data: result.data });
  };

  /**
   * Login user
   * @param req
   * @param reply
   * @returns
   */
  loginUser = async (req: Request, reply: FastifyReply) => {
    const loginDto = new LoginUserDto({ ...(req.body as any) });

    const error = await validateDto(loginDto);
    if (error) {
      reply.status(400).send({ error });
      return;
    }

    const result = await this.authService.loginUser(loginDto);
    if (result.error) {
      reply.status(result.error.status).send({ error: result.error.message });
      return;
    }

    reply
      .status(201)
      .send({ message: "User logged in successfully", data: result.data });
  };
}
