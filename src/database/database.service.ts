import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  logger: Logger;
  constructor() {
    super();
    this.logger = new Logger(DatabaseService.name);
  }
  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Database connection successful');
    } catch (e) {
      this.logger.error(`Database connection failed, reason: ${e.message}`);
    }
  }
}
