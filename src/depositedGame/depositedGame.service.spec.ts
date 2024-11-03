import { Test, TestingModule } from '@nestjs/testing';
import { DepositedGameService } from './depositedGame.service';
import { getModelToken } from '@nestjs/mongoose';
import { DepositedGame } from '../schemas/depositedGame.schema';
import { Seller } from '../schemas/seller.schema';
import { Session } from '../schemas/session.schema';
import { GameDescription } from '../schemas/gameDescription.schema';
import { Types } from 'mongoose';

describe('DepositedGameService', () => {
  let service: DepositedGameService;

  const mockDepositedGameModel = {
    create: jest.fn(),
    findById: jest.fn().mockReturnThis(),
    find: jest.fn().mockReturnThis(),
    findByIdAndDelete: jest.fn().mockReturnThis(),
    exec: jest.fn(),
  };

  const mockSessionModel = {
    findById: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(true) }), // Mock pour simuler findById().exec()
  };

  const mockSellerModel = {
    findById: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(true) }), // Mock pour simuler findById().exec()
  };

  const mockGameDescriptionModel = {
    findById: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(true) }), // Mock pour simuler findById().exec()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepositedGameService,
        {
          provide: getModelToken(DepositedGame.name),
          useValue: mockDepositedGameModel,
        },
        {
          provide: getModelToken(Session.name),
          useValue: mockSessionModel,
        },
        {
          provide: getModelToken(Seller.name),
          useValue: mockSellerModel,
        },
        {
          provide: getModelToken(GameDescription.name),
          useValue: mockGameDescriptionModel,
        },
      ],
    }).compile();

    service = module.get<DepositedGameService>(DepositedGameService);
  });

  it('should create a deposited game', async () => {
    const gameData = {
      sellerId: new Types.ObjectId('6726abb23fdf823146d55a4b'),
      sessionId: new Types.ObjectId('67275d9606e4b08ee6312360'),
      gameDescriptionId: new Types.ObjectId('6720ca0bd905cf2bdf52678e'),
      salePrice: 50,
      forSale: false,
      pickedUp: false,
      sold: false,
    };

    mockDepositedGameModel.create.mockResolvedValue(gameData);

    const result = await service.create(gameData);
    expect(result).toEqual(gameData);
    expect(mockDepositedGameModel.create).toHaveBeenCalledWith(gameData);
  });

  it('should return deposited games by seller ID', async () => {
    const sellerId = new Types.ObjectId('6726abb23fdf823146d55a4b');
    const games = [{ salePrice: 50 }, { salePrice: 75 }];
    mockDepositedGameModel.find.mockReturnValue({
      exec: jest.fn().mockResolvedValue(games),
    });

    const result = await service.findBySellerId(sellerId.toString());
    expect(result).toEqual(games);
    expect(mockDepositedGameModel.find).toHaveBeenCalledWith({ sellerId });
  });

  it('should return deposited games by seller ID and session ID', async () => {
    const sellerId = new Types.ObjectId('6726abb23fdf823146d55a4b');
    const sessionId = new Types.ObjectId('67275d9606e4b08ee6312360');
    const games = [{ salePrice: 50 }];
    mockDepositedGameModel.find.mockReturnValue({
      exec: jest.fn().mockResolvedValue(games),
    });

    const result = await service.findBySellerAndSession(sellerId.toString(), sessionId.toString());
    expect(result).toEqual(games);
    expect(mockDepositedGameModel.find).toHaveBeenCalledWith({
      sellerId,
      sessionId,
    });
  });
});
