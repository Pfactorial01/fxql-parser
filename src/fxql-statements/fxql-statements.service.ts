import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FxqlStatementsService {
  logger: Logger;
  constructor(private readonly databaseService: DatabaseService) {
    this.logger = new Logger(FxqlStatementsService.name);
  }

  async submitEntry(createEntryDto: Prisma.EntryCreateInput[]) {
    try {
      const res = await this.databaseService.entry.createManyAndReturn({
        data: createEntryDto.map((item) => item),
      });
      this.logger.log('Entries submitted succefully!');
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
    } catch (e) {
      this.logger.error(
        `Error occcured during entry submission!, reason: ${e.message}`,
      );
      throw e;
    }
  }
}
