import { Test, TestingModule } from '@nestjs/testing';
import { FxqlStatementsController } from './fxql-statements.controller';

describe('FxqlStatementsController', () => {
  let controller: FxqlStatementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FxqlStatementsController],
    }).compile();

    controller = module.get<FxqlStatementsController>(FxqlStatementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
