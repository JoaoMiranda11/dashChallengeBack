import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from "@nestjs/common";
import { FindOneUser } from "./dto/findOne.dto";
import { UsersService } from "./users.service";
import { User } from "./schemas/users.entity";
import { CreateUser } from "./dto/create.dto";
import { AuthGuard } from "src/guards/auth/auth.guard";

@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get(":id")
  @UseGuards(AuthGuard)
  async findOne(@Param() userId?: FindOneUser): Promise<User> {
    return await this.userService.findOne(userId);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() user: CreateUser): Promise<User> {
    return await this.userService.create(user);
  }

  @Patch()
  @UseGuards(AuthGuard)
  async edit(@Body() user: CreateUser): Promise<User> {
    return await this.userService.edit(user);
  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  async delete(@Param() userId?: FindOneUser): Promise<void> {
    await this.userService.delete(userId);
  }
}
