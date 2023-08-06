import { IsNotEmpty, IsString } from "class-validator";

export class FindOneUser {
  @IsString()
  @IsNotEmpty()
  public id: string;
}
