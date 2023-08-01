import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SaveEditorContentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsInt()
  @IsOptional()
  id?: number;

  constructor(data: SaveEditorContentDto) {
    this.content = data.content;
    this.id = data.id;
  }
}
