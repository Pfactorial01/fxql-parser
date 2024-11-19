import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { FxqlStatementsModule } from './fxql-statements/fxql-statements.module';

@Module({
  imports: [DatabaseModule, FxqlStatementsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
