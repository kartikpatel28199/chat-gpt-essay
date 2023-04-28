import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/register-user.dto";
import { validateDto } from "../../core/validations/dto-validation";
import { LoginUserDto } from "./dto/login-user.dto";

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

  /**
   * Login user
   * @param req
   * @param res
   * @returns
   */
  loginUser = async (req: Request, res: Response) => {
    const loginDto = new LoginUserDto({ ...req.body });

    const error = await validateDto(loginDto);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    const result = await this.authService.loginUser(loginDto);
    if (result.error) {
      res.status(result.error.status).json({ message: result.error.message });
      return;
    }

    res
      .status(201)
      .json({ message: "User logged in successfully", data: result.data });
  };

  /**
   * Google login callback
   * @param req
   * @param res
   * @returns
   */
  googleLoginCallback = async (req: Request, res: Response) => {
    const result = await this.authService.googleLoginCallback(
      req.session["passport"]["user"]
    );
    if (result.error) {
      res.status(result.error.status).json({ message: result.error.message });
      return;
    }

    res
      .status(201)
      .json({ message: "User logged in successfully", data: result.data });
  };
}
