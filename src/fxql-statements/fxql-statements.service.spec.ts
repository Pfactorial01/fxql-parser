import { Test, TestingModule } from '@nestjs/testing';
import { FxqlStatementsService } from './fxql-statements.service';

describe('FxqlStatementsService', () => {
  let service: FxqlStatementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FxqlStatementsService],
    }).compile();

    service = module.get<FxqlStatementsService>(FxqlStatementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
