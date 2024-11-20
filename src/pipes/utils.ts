import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

const characterPositionString = (line: number, position: number) => {
  return `Character at line ${line + 1} position ${position + 1}`;
};

export const validateCurrencyPairLine = (line: string, index: number) => {
  const upperCaseRegex = /^[A-Z]$/;
  for (let i = 0; i < line.length; i++) {
    if ([0, 1, 2, 4, 5, 6].includes(i) && !upperCaseRegex.test(line[i])) {
      throw new BadRequestException({
        message: `${characterPositionString(index, i)} is not an uppercase character`,
        code: 'FXQL-400',
      });
    }
    if (i === 3 && line[i] !== '-') {
      throw new BadRequestException({
        message: `${characterPositionString(index, i)} is not hyphen (-)`,
        code: 'FXQL-400',
      });
    }
    if (i === 7 && line[i] !== ' ') {
      throw new BadRequestException({
        message: `${characterPositionString(index, i)} is not space (" ")`,
        code: 'FXQL-400',
      });
    }
    if (i === 8 && line[i] !== '{') {
      throw new BadRequestException({
        message: `${characterPositionString(index, i)} is not open bracket ("{")`,
        code: 'FXQL-400',
      });
    }
    if (i > 8) {
      throw new BadRequestException({
        message: `${characterPositionString(index, i)} should start on new line`,
        code: 'FXQL-400',
      });
    }
  }
};

export const validateBuyLine = (
  line: string,
  index: number,
  whitespace: number,
) => {
  for (let i = 0; i < line.length; i++) {
    if (line[i] === ' ' && whitespace === i) {
      whitespace++;
      continue;
    }
    if (i !== whitespace) {
      if (i - whitespace === 1 && line.slice(i - 1, i + 2) === 'BUY') {
        i += 2;
      }
      if (i - whitespace === 1 && line.slice(i - 1, i + 2) !== 'BUY') {
        throw new BadRequestException({
          message: `${characterPositionString(index, i - 1)} should be "BUY"`,
          code: 'FXQL-400',
        });
      }
      if (i === whitespace + 3 && line[i] !== ' ') {
        throw new BadRequestException({
          message: `${characterPositionString(index, i)} should be space " "`,
          code: 'FXQL-400',
        });
      }
      const value = Number(line.slice(whitespace + 3));
      if (isNaN(value) || value <= 0) {
        throw new BadRequestException({
          message: `${characterPositionString(index, i + 1)} should be a positive number`,
          code: 'FXQL-400',
        });
      }
      return value;
    }
  }
  throw new BadRequestException({
    message: `Buy line afer line ${index} is missing or malformed`,
    code: 'FXQL-400',
  });
};

export const validateSellLine = (
  line: string,
  index: number,
  whitespace: number,
) => {
  for (let i = 0; i < line.length; i++) {
    if (line[i] === ' ' && whitespace === i) {
      whitespace++;
      continue;
    }
    if (i !== whitespace) {
      if (i - whitespace === 1 && line.slice(i - 1, i + 3) === 'SELL') {
        i += 3;
      }
      if (i - whitespace === 1 && line.slice(i - 1, i + 3) !== 'SELL') {
        throw new BadRequestException({
          message: `${characterPositionString(index, i - 1)} should be "SELL"`,
          code: 'FXQL-400',
        });
      }
      if (i === whitespace + 4 && line[i] !== ' ') {
        throw new BadRequestException({
          message: `${characterPositionString(index, i)} should be space " "`,
          code: 'FXQL-400',
        });
      }
      const value = Number(line.slice(whitespace + 4));
      if (isNaN(value) || value <= 0) {
        throw new BadRequestException({
          message: `${characterPositionString(index, i + 1)} should be a positive number`,
          code: 'FXQL-400',
        });
      }
      return value;
    }
  }
  throw new BadRequestException({
    message: `Sell line afer line ${index} is missing or malformed`,
    code: 'FXQL-400',
  });
};

export const validateCapLine = (
  line: string,
  index: number,
  whitespace: number,
) => {
  for (let i = 0; i < line.length; i++) {
    if (line[i] === ' ' && whitespace === i) {
      whitespace++;
      continue;
    }
    if (i !== whitespace) {
      if (i - whitespace === 1 && line.slice(i - 1, i + 2) === 'CAP') {
        i += 2;
      }
      if (i - whitespace === 1 && line.slice(i - 1, i + 2) !== 'CAP') {
        throw new BadRequestException({
          message: `${characterPositionString(index, i - 1)} should be "CAP"`,
          code: 'FXQL-400',
        });
      }
      if (i === whitespace + 3 && line[i] !== ' ') {
        throw new BadRequestException({
          message: `${characterPositionString(index, i)} should be space " "`,
          code: 'FXQL-400',
        });
      }
      const value = line.slice(whitespace + 4).trim();
      const wholeNumberRegex = /^\d+$/;
      if (!wholeNumberRegex.test(value)) {
        throw new BadRequestException({
          message: `${characterPositionString(index, i + 1)} should be a positive whole number`,
          code: 'FXQL-400',
        });
      }
      return parseInt(value);
    }
  }
  throw new BadRequestException({
    message: `Cap amount line afer line ${index} is missing or malformed`,
    code: 'FXQL-400',
  });
};
