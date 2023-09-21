import {
  HttpException,
  HttpStatus,
  Injectable,
  UseGuards,
} from "@nestjs/common";
import { FindOneUser } from "./dto/findOne.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schemas/users.entity";
import { CreateUser } from "./dto/create.dto";
import { AuthGuard } from "src/guards/auth/auth.guard";
import * as bcrypt from "bcrypt";

@Injectable()
@UseGuards(AuthGuard)
export class UsersService {
  private salts = 10;
  private notAdminFilter = { role: { $ne: "admin" } };
  constructor(@InjectModel("Users") private readonly userModel: Model<User>) {}

  public async findOne(user: FindOneUser): Promise<User> {
    if (user.id === undefined)
      throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    const u = await this.userModel.findById(user.id).exec();
    if (u.role === "admin") return null;
    return u;
  }

  public async findAll(): Promise<User[]> {
    return await this.userModel.find(this.notAdminFilter).exec();
  }

  public async create(user: CreateUser): Promise<User> {
    const newUser = await new this.userModel(user).save();
    newUser.id = newUser._id;
    newUser.password = await bcrypt.hash(newUser.password, this.salts);
    return newUser;
  }

  public async edit(user: CreateUser): Promise<User> {
    if (user.id === undefined)
      throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    user.password = await bcrypt.hash(user.password, this.salts);
    await this.userModel
      .updateOne({ _id: user.id, ...this.notAdminFilter }, user)
      .exec();
    return this.findOne({ id: user.id });
  }

  public async delete(user: FindOneUser): Promise<void> {
    if (user.id === undefined)
      throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    await this.userModel
      .deleteOne({ _id: user.id, ...this.notAdminFilter })
      .exec();
  }
}
