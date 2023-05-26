import { UserService } from "./users.service";
import { Response } from "express";
import { Request } from "../../core/types/request.types";

export class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * Get user information
   * @param req
   * @param res
   * @returns
   */
  getUserInformation = async (req: Request, res: Response) => {
    const result = await this.userService.getUserInformation(req.user);
    if (result.error) {
      res.status(result.error.status).json({ message: result.error.message });
      return;
    }

    res
      .status(201)
      .json({
        message: "User details fetched successfully",
        data: result.data,
      });
  };
}
