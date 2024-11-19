import { Body, Controller, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FxqlStatementsService } from './fxql-statements.service';

@Controller('fxql-statements')
export class FxqlStatementsController {
  constructor(private readonly fxqlStatementsService: FxqlStatementsService) {}

  @Post()
  createEntry(@Body() createEntryDto: Prisma.EntryCreateInput[]) {
    return this.fxqlStatementsService.submitEntry(createEntryDto);
  }
}
