import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MongooseModule } from "@nestjs/mongoose";

import { Module } from "@nestjs/common";
import { UserSchema } from "./schemas/users.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Users", schema: UserSchema, collection: "sample" },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
