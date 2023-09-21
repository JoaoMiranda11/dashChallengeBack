import { IsBoolean, IsNumber, IsString } from "class-validator";
import { Schema } from "mongoose";

export class User {
  @IsNumber()
  public _id: string;

  @IsString()
  public name: string;

  @IsString()
  public email: string;

  @IsNumber()
  public age: number;

  @IsString()
  public password: string;

  @IsBoolean()
  public role: "admin" | "custom";
}

export const UserSchema = new Schema({
  id: String,
  name: String,
  email: String,
  age: String,
  password: String,
  admin: String,
});
