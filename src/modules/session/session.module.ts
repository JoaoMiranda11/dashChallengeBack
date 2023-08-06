import { SessionController } from "./session.controller";
import { SessionService } from "./session.service";

import { Module } from "@nestjs/common";

@Module({
  imports: [],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
