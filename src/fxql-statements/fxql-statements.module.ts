import { Module } from '@nestjs/common';
import { FxqlStatementsController } from './fxql-statements.controller';
import { FxqlStatementsService } from './fxql-statements.service';

@Module({
  controllers: [FxqlStatementsController],
  providers: [FxqlStatementsService],
})
export class FxqlStatementsModule {}
