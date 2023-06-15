import { UserService } from "./users.service";
import { Request } from "../../core/types/request.types";
import { FastifyReply } from "fastify";

export class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * Get user information
   * @param req
   * @param reply
   * @returns
   */
  getUserInformation = async (req: Request, reply: FastifyReply) => {
    const result = await this.userService.getUserInformation(req.user);
    if (result.error) {
      reply.code(result.error.status).send({ message: result.error.message });
      return;
    }

    reply.code(201).send({
      message: "User details fetched successfully",
      data: result.data,
    });
  };
}
