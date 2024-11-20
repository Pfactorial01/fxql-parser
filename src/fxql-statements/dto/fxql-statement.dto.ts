import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class SubmitFXQLStatementDto {
  @ApiProperty({
    description: 'FXQL statement(s)',
    example:
      'USD-GBP {\\n  BUY 0.85\\n  SELL 0.90\\n  CAP 10000\\n}\\n\\nEUR-JPY {\\n  BUY 145.20\\n  SELL 146.50\\n  CAP 50000\\n}\\n\\nNGN-USD {\\n  BUY 0.0022\\n  SELL 0.0023\\n  CAP 2000000\\n}',
  })
  FXQL: string;
}

export class SuccesfulResponseDto {
  @ApiProperty({
    description: 'description of result',
    example: 'FXQL Statement Parsed Successfully.',
  })
  message: string;
  @ApiProperty({
    description: 'FXQL status code',
    example: 'FXQL-200',
  })
  code: string;
  @ApiProperty({
    description: 'Validated FXQL data',
    example: [
      {
        EntryId: 17,
        SourceCurrency: 'EUR',
        DestinationCurrency: 'JPY',
        SellPrice: '146.5',
        BuyPrice: '145.2',
        CapAmount: 50000,
      },
      {
        EntryId: 18,
        SourceCurrency: 'NGN',
        DestinationCurrency: 'USD',
        SellPrice: '0.0023',
        BuyPrice: '0.0022',
        CapAmount: 2000000,
      },
    ],
  })
  data: Prisma.EntryCreateInput[];
}

export class BadRequestResponseDto {
  @ApiProperty({
    description: 'description of error',
    example: 'Maximum 1000 FXQL statements allowed per request',
  })
  message: string;
  @ApiProperty({
    description: 'FXQL status code',
    example: 'FXQL-400',
  })
  code: string;
}
