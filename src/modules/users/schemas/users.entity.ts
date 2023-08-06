import { IsNumber, IsString } from "class-validator";
import { Schema } from "mongoose";

export class User {
  @IsNumber()
  public id: string;

  @IsString()
  public name: string;

  @IsString()
  public email: string;

  @IsNumber()
  public age: number;

  @IsString()
  public avatar: string;
}

export const UserSchema = new Schema({
  id: String,
  name: String,
  email: String,
  age: String,
  avatar: String,
});
