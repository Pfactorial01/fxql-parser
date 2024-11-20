import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  validateBuyLine,
  validateCapLine,
  validateCurrencyPairLine,
  validateSellLine,
} from './utils';

@Injectable()
export class IsValidFXQLPipe implements PipeTransform {
  transform(value: { FXQL?: string | undefined }): Prisma.EntryCreateInput[] {
    if (value?.FXQL === undefined) {
      throw new BadRequestException({
        message: "'FXQL' key not found inside request body",
        code: 'FXQL-400',
      });
    }

    const fxqlStatement = value.FXQL;

    // Split the FXQL statements into individual lines
    const lines = fxqlStatement.split('\\n');
    const TotalNumberOfLines = 1000 * 5;
    if (lines.length > TotalNumberOfLines) {
      throw new BadRequestException({
        message: 'Maximum 1000 FXQL statements allowed per request',
        code: 'FXQL-400',
      });
    }
    const res: Prisma.EntryCreateInput[] = [];
    const existingPairs = {};

    lines.forEach((line, index) => {
      if (index % 6 === 0) {
        // currency pair line
        validateCurrencyPairLine(line, index);
        const source_currency = line.slice(0, 3);
        const destination_currency = line.slice(4, 7);
        if (
          existingPairs[`${source_currency}_${destination_currency}`] ===
          undefined
        ) {
          res.push({
            source_currency,
            destination_currency,
          });
          existingPairs[`${source_currency}_${destination_currency}`] = 1;
        }
      }
      if (index % 6 === 1) {
        // buy price line
        let whitespace = 0;
        const buy_price = validateBuyLine(line, index, whitespace);
        res[res.length - 1].buy_price = buy_price;
      }
      if (index % 6 === 2) {
        // sell price line
        let whitespace = 0;
        const sell_price = validateSellLine(line, index, whitespace);
        res[res.length - 1].sell_price = sell_price;
      }
      if (index % 6 === 3) {
        // cap amount line
        let whitespace = 0;
        const cap_amount = validateCapLine(line, index, whitespace);
        res[res.length - 1].cap_amount = cap_amount;
      }
      if (index % 6 === 4) {
        // closing curly breacket line
        if (line.trim() !== '}') {
          throw new BadRequestException({
            message: `Character at line ${index + 1} should be a close bracket "}"`,
            code: 'FXQL-400',
          });
        }
      }
      if (index % 6 === 5) {
        // statement separator line
        if (line !== '') {
          throw new BadRequestException({
            message: `Character after line ${index} should be a new line to separate fxql statements`,
            code: 'FXQL-400',
          });
        }
      }
    });
    return res;
  }
}
