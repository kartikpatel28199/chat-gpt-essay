import { IsNotEmpty, IsString } from "class-validator";

export class AskQuestionDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  constructor(data: AskQuestionDto) {
    this.question = data.question;
  }
}
