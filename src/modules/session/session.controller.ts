import { Controller, Post, Body } from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";
import { AuthData } from "./session.types";
import { SessionService } from "./session.service";

@Controller("session")
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Post()
  async findOne(@Body() authData?: AuthDto): Promise<AuthData> {
    return await this.sessionService.findOne(authData);
  }
}
