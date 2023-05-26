import { IsString, IsEmail, IsNotEmpty } from "class-validator";

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  constructor(data: LoginUserDto) {
    this.email = data.email;
    this.password = data.password;
  }
}
