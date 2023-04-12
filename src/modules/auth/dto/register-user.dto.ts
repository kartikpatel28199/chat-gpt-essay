import { IsString, IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  constructor(data: CreateUserDto) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
  }
}
