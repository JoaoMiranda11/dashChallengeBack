import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import fastifyCookie from "@fastify/cookie";

/**
 * login: joao@admin.com
 * password: admin
 */

const PORT = process.env.PORT;

async function bootstrap() {
  if (PORT === undefined) throw new Error("Invalid PORT!");
  console.log(`Running at port ${PORT}`);
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.register(fastifyCookie);
  const options = {
    origin: ["http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };

  app.enableCors(options);
  await app.listen(PORT);
}
bootstrap();
