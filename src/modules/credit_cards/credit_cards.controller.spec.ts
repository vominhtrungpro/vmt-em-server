import { Test, TestingModule } from '@nestjs/testing';
import { CreditCardsController } from './credit_cards.controller';
import { CreditCardsService } from './credit_cards.service';

describe('CreditCardsController', () => {
  let controller: CreditCardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreditCardsController],
      providers: [CreditCardsService],
    }).compile();

    controller = module.get<CreditCardsController>(CreditCardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
