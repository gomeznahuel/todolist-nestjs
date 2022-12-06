import { Injectable, Query } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getUsers(): string[] {
    return ['John', 'Jane', 'Bob'];
  }
}
