import { UserSchema } from "../users/schemas/users.entity";
import { SessionController } from "./session.controller";
import { SessionService } from "./session.service";

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Users", schema: UserSchema, collection: "sample" },
    ]),
  ],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
