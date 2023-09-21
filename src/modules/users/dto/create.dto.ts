import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUser {
  @IsNumber()
  @IsNotEmpty()
  public id: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public email: string;

  @IsNumber()
  @IsNotEmpty()
  public age: number;

  @IsNumber()
  @IsNotEmpty()
  public password: string;
}
