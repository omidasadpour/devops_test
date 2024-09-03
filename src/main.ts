import { NestFactory } from '@nestjs/core';
import { AccountApiModule } from './account.api/account.api.module';

async function bootstrap() {
  const accountApi = await NestFactory.create(AccountApiModule);
  await accountApi.listen(80);
}
bootstrap();
