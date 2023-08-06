import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FindOneUser } from "./dto/findOne.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schemas/users.entity";
import { CreateUser } from "./dto/create.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel("Users") private readonly userModel: Model<User>) {}

  public async findOne(user: FindOneUser): Promise<User> {
    if (user.id === undefined)
      throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    return await this.userModel.findById(user.id).exec();
  }

  public async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  public async create(user: CreateUser): Promise<User> {
    const newUser = await new this.userModel(user).save();
    newUser.id = newUser._id;
    return newUser;
  }

  public async edit(user: CreateUser): Promise<User> {
    if (user.id === undefined)
      throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    await this.userModel.updateOne({ _id: user.id }, user).exec();
    return this.findOne({ id: user.id });
  }

  public async delete(user: FindOneUser): Promise<void> {
    if (user.id === undefined)
      throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    await this.userModel.deleteOne({ _id: user.id }).exec();
  }
}
