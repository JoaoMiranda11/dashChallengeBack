import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const PORT = process.env.PORT;

async function bootstrap() {
  if (PORT === undefined) throw new Error("Invalid PORT!");
  console.log(`Running at port ${PORT}`);
  const app = await NestFactory.create(AppModule);
  const options = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };

  app.enableCors(options);
  await app.listen(PORT);
}
bootstrap();
