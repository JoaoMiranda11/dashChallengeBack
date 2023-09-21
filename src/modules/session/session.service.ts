import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../users/schemas/users.entity";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
@Injectable()
export class SessionService {
  constructor(@InjectModel("Users") private readonly userModel: Model<User>) {}

  public async findOne(authData: AuthDto) {
    const res = await this.userModel.findOne({
      email: authData.username,
      role: "admin",
    });
    const isMatch = await bcrypt.compare(authData.password, res?.password);
    if (!isMatch)
      throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    return res;
  }
}
