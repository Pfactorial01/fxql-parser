import { Module } from '@nestjs/common';
import { FxqlStatementsController } from './fxql-statements.controller';

@Module({
  controllers: [FxqlStatementsController]
})
export class FxqlStatementsModule {}
