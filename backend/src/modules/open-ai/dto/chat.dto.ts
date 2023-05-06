import { IsNotEmpty, IsString } from "class-validator";

export class AskQuestionDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  constructor(data: AskQuestionDto) {
    this.message = data.message;
  }
}
