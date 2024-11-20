import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FxqlStatementsService } from './fxql-statements.service';
import { IsValidFXQLPipe } from 'src/pipes/validate-transform.pipe';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiProperty,
  ApiBody,
} from '@nestjs/swagger';
import {
  SuccesfulResponseDto,
  BadRequestResponseDto,
  SubmitFXQLStatementDto,
} from './dto/fxql-statement.dto';

@Controller('fxql-statements')
export class FxqlStatementsController {
  constructor(private readonly fxqlStatementsService: FxqlStatementsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Upload exchange rates',
  })
  @ApiResponse({
    status: 200,
    description: 'FXQL Statement Parsed Successfully.',
    type: SuccesfulResponseDto,
  })
  @ApiBody({
    type: SubmitFXQLStatementDto,
    description: 'Json structure for request body',
  })
  @ApiBadRequestResponse({
    description: 'Error occured while parsing data',
    type: BadRequestResponseDto,
  })
  @UsePipes(ValidationPipe)
  createEntry(
    @Body(new IsValidFXQLPipe()) createEntryDto: Prisma.EntryCreateInput[],
  ) {
    return this.fxqlStatementsService.submitEntry(createEntryDto);
  }
}
