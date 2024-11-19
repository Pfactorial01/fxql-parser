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
    return res.map((item) => {
      return {
        EntryId: item.id,
        SourceCurrency: item.source_currency,
        DestinationCurrency: item.destination_currency,
        SellPrice: item.sell_price,
        BuyPrice: item.buy_price,
        CapAmount: item.cap_amount,
      };
    });
  }
}