import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FxqlStatementsService } from './fxql-statements.service';
import { IsValidFXQLPipe } from 'src/pipes/validate-transform.pipe';

@Controller('fxql-statements')
export class FxqlStatementsController {
  constructor(private readonly fxqlStatementsService: FxqlStatementsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createEntry(
    @Body(new IsValidFXQLPipe()) createEntryDto: Prisma.EntryCreateInput[],
  ) {
    return this.fxqlStatementsService.submitEntry(createEntryDto);
  }
}
