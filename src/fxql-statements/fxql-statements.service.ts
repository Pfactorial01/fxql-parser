import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FxqlStatementsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async submitEntry(createEntryDto: Prisma.EntryCreateInput[]) {
    const res = await this.databaseService.entry.createManyAndReturn({
      data: createEntryDto.map((item) => item),
    });
    return {
      message: 'FXQL Statement Parsed Successfully.',
      code: 'FXQL-200',
      data: res.map((item) => {
        return {
          EntryId: item.id,
          SourceCurrency: item.source_currency,
          DestinationCurrency: item.destination_currency,
          SellPrice: Number(item.sell_price),
          BuyPrice: Number(item.buy_price),
          CapAmount: item.cap_amount,
        };
      }),
    };
  }
}
