import { BadRequestException } from '@nestjs/common';
import { IsValidFXQLPipe } from './validate-transform.pipe';

describe('ParseFXQLStatements', () => {
  let pipe: IsValidFXQLPipe;

  beforeEach(() => {
    pipe = new IsValidFXQLPipe();
  });

  it('should be defined', () => {
    expect(new IsValidFXQLPipe()).toBeDefined();
  });

  it(`should throw an exception for missing FXQL keys`, () => {
    const value = () => pipe.transform({});
    expect(value).toThrow(BadRequestException);
  });
  it(`should throw an exception for empty statement`, () => {
    const value = () =>
      pipe.transform({
        FXQL: 'USD-GBP {\\n}',
      });
    expect(value).toThrow(BadRequestException);
  });
  it(`should throw an exception for lowercase in currency pair`, () => {
    const value = () =>
      pipe.transform({
        FXQL: 'usd-GBP {\\n  BUY 0.85\\n  SELL 0.90\\n  CAP 10000\\n}',
      });
    expect(value).toThrow(BadRequestException);
  });
  it(`should throw an exception for missing space after currency pair`, () => {
    const value = () =>
      pipe.transform({
        FXQL: 'USD-GBP{\\n  BUY 0.85\\n  SELL 0.90\\n  CAP 10000\\n}',
      });
    expect(value).toThrow(BadRequestException);
  });
  it(`should throw an exception for invalid numeric amount`, () => {
    const value = () =>
      pipe.transform({
        FXQL: 'USD-GBP{\\n  BUY abc\\n  SELL 0.90\\n  CAP 10000\\n}',
      });
    expect(value).toThrow(BadRequestException);
  });
  it(`should throw an exception for negative cap amount`, () => {
    const value = () =>
      pipe.transform({
        FXQL: 'USD-GBP{\\n  BUY 0.85\\n  SELL 0.90\\n  CAP -100\\n}',
      });
    expect(value).toThrow(BadRequestException);
  });
  it(`should throw an exception for Multiple FXQL statements should be separated by a single newline character`, () => {
    const value = () =>
      pipe.transform({
        FXQL: 'USD-GBP {\\n  BUY 0.85\\n  SELL 0.90\\n  CAP 10000\\n}\\nEUR-JPY {\\n  BUY 145.20\\n  SELL 146.50\\n  CAP 50000\\n}',
      });
    expect(value).toThrow(BadRequestException);
  });
  it(`should throw an exception for Multiple newlines within a single FXQL statement not allowed`, () => {
    const value = () =>
      pipe.transform({
        FXQL: 'USD-GBP {\\n  BUY 0.85\\n  SELL 0.90\\n  \\n  CAP 10000\\n}',
      });
    expect(value).toThrow(BadRequestException);
  });
  it(`should parse succesfully without error`, () => {
    const value = () =>
      pipe.transform({
        FXQL: 'USD-GBP {\\n  BUY 0.85\\n  SELL 0.90\\n CAP 10000\\n}',
      });
    expect(value).toBeTruthy();
  });
  it(`should parse multiple statements succesfully without error`, () => {
    const value = () =>
      pipe.transform({
        FXQL: 'USD-GBP {\\n  BUY 0.85\\n  SELL 0.90\\n CAP 10000\\n}\\n\\nNGN-USD {\\n  BUY 0.0022\\n  SELL 0.0023\\n  CAP 2000000\\n}',
      });
    expect(value).toBeTruthy();
  });
});
