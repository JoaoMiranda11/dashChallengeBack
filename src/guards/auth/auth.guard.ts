import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { FastifyRequest } from "fastify";
import { ConfigService } from "@nestjs/config";
import { jwtVerify } from "jose";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/modules/users/schemas/users.entity";
@Injectable()
export class AuthGuard implements CanActivate {
  private authCookieName: string;
  constructor(
    @InjectModel("Users") private readonly userModel: Model<User>,
    private readonly configService: ConfigService,
  ) {
    this.authCookieName = configService.get("JWT_TOKEN_NAME");
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const authCookie = request.cookies?.[this.authCookieName];

    const sessionData = await this.verifyJwtToken<{ user: User }>(authCookie);
    if (sessionData?.user?._id) {
      const res = await this.userModel.findOne({
        _id: sessionData.user._id,
        role: "admin",
      });
      if (res) {
        return true;
      }
    }

    return false;
  }

  getJwtSecretKey() {
    const secret = process.env.JWT_SECRET_KEY;

    if (!secret) {
      throw new Error("JWT Secret key is not matched");
    }

    return new TextEncoder().encode(secret);
  }

  async verifyJwtToken<T>(token: string): Promise<T | null> {
    try {
      const { payload } = await jwtVerify(token, this.getJwtSecretKey());

      return payload as T;
    } catch (error) {
      return null;
    }
  }
}
