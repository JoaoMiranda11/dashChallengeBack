import { SessionModule } from "./modules/session/session.module";
import { UsersModule } from "./modules/users/users.module";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

const connectionString = `mongodb+srv://jsm2pe:joao87988731995@cluster0.bblbp5k.mongodb.net/?retryWrites=true&w=majority`;
@Module({
  imports: [
    MongooseModule.forRoot(connectionString),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    SessionModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
