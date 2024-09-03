import { Module } from '@nestjs/common';
import { AccountApiController } from './account.api.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [AccountApiController],
})
export class AccountApiModule {}
