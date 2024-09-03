import { Controller, Get } from '@nestjs/common';

@Controller()
export class AccountApiController {
  @Get('/')
  get(): any {
    const date = new Date();
    console.log(`${date.toISOString()}: Received GET request`);
    return { data: 'Everything is working fine' };
  }
}
1;
