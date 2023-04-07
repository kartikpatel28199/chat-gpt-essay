import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/register-user.dto";
import { validateDto } from "../../core/validations/dto-validation";

export class AuthController {
  public authService = new AuthService();

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * Register user
   * @param req
   * @param res
   * @returns
   */
  registerUser = async (req: Request, res: Response) => {
    const registerUserDto = new CreateUserDto({ ...req.body });

    const error = await validateDto(registerUserDto);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    const result = await this.authService.registerUser(registerUserDto);
    if (result.error) {
      res.status(result.error.status).json({ message: result.error.message });
      return;
    }

    res
      .status(201)
      .json({ message: "User registered successfully", data: result.data });
  };
}
