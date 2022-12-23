import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService {
  constructor(private configService: ConfigService) {}

  getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      database: this.configService.get<string>('DB_NAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      schema: this.configService.get<string>('DB_SCHEMA'),
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    };
  }
}
