import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";

@Injectable()
export class SessionService {
  public async findOne(authData: AuthDto) {
    if (authData.password == "admin" && authData.username == "admin@a.com") {
      return {
        email: "admin@a.com",
        name: "João Miranda",
        id: "1",
        role: "admin",
        thumbnail: "",
      };
    }
    throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
  }
}
