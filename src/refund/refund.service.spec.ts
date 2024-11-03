import { Test, TestingModule } from '@nestjs/testing';
import { RefundService } from './refund.service';
import { getModelToken } from '@nestjs/mongoose';
import { Refund } from '../schemas/refund.schema';
import { Seller } from '../schemas/seller.schema';
import { Session } from '../schemas/session.schema';
import { Manager } from '../schemas/manager.schema';
import { Types } from 'mongoose';

describe('RefundService', () => {
  let service: RefundService;

  const mockRefundModel = {
    create: jest.fn(),
    findById: jest.fn().mockReturnThis(),
    findByIdAndUpdate: jest.fn().mockReturnThis(),
    find: jest.fn().mockReturnThis(),
    deleteOne: jest.fn().mockReturnThis(),
    findByIdAndDelete: jest.fn().mockReturnThis(),
    exec: jest.fn(),
  };

  const mockSellerModel = {};
  const mockSessionModel = {};
  const mockManagerModel = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefundService,
        {
          provide: getModelToken(Refund.name),
          useValue: mockRefundModel,
        },
        {
          provide: getModelToken(Seller.name),
          useValue: mockSellerModel,
        },
        {
          provide: getModelToken(Session.name),
          useValue: mockSessionModel,
        },
        {
          provide: getModelToken(Manager.name),
          useValue: mockManagerModel,
        },
      ],
    }).compile();

    service = module.get<RefundService>(RefundService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a refund', async () => {
    const refundData = {
      sellerId: new Types.ObjectId('6726abb23fdf823146d55a4b'),
      sessionId: new Types.ObjectId('67275d9606e4b08ee6312360'),
      managerId: new Types.ObjectId('6720ca0bd905cf2bdf52678e'),
      refundAmount: 50,
      refundDate: new Date(),
    };

    mockRefundModel.create.mockResolvedValue(refundData);

    const result = await service.create(refundData, '6720ca0bd905cf2bdf52678e');
    expect(result).toEqual(refundData);
    expect(mockRefundModel.create).toHaveBeenCalledWith({
      ...refundData,
      managerId: new Types.ObjectId('6720ca0bd905cf2bdf52678e'),
    });
  });

  it('should return all refunds', async () => {
    const refunds = [{ refundAmount: 50 }, { refundAmount: 70 }];
    mockRefundModel.find.mockReturnValue({
      exec: jest.fn().mockResolvedValue(refunds),
    });

    const result = await service.findAll();
    expect(result).toEqual(refunds);
    expect(mockRefundModel.find).toHaveBeenCalled();
  });

  it('should return refunds of a seller', async () => {
    const sellerId = '6726abb23fdf823146d55a4b';
    const refunds = [{ refundAmount: 50 }, { refundAmount: 30 }];
    mockRefundModel.find.mockReturnValue({
      exec: jest.fn().mockResolvedValue(refunds),
    });

    const result = await service.findBySellerId(sellerId);
    expect(result).toEqual(refunds);
    expect(mockRefundModel.find).toHaveBeenCalledWith({ sellerId });
  });

  it('should return refunds of a seller for a specific session', async () => {
    const sellerId = '6726abb23fdf823146d55a4b';
    const sessionId = '67275d9606e4b08ee6312360';
    const refunds = [{ refundAmount: 50 }];
    mockRefundModel.find.mockReturnValue({
      exec: jest.fn().mockResolvedValue(refunds),
    });

    const result = await service.findBySellerAndSession(sellerId, sessionId);
    expect(result).toEqual(refunds);
    expect(mockRefundModel.find).toHaveBeenCalledWith({
      sellerId,
      sessionId,
    });
  });

  it('should return a refund by its id', async () => {
    const refundId = '67275d9606e4b08ee6312360';
    const refund = { refundAmount: 50 };
    mockRefundModel.findById.mockReturnValue({
      exec: jest.fn().mockResolvedValue(refund),
    });

    const result = await service.findOne(refundId);
    expect(result).toEqual(refund);
    expect(mockRefundModel.findById).toHaveBeenCalledWith(refundId);
  });

  it('should delete a refund', async () => {
    const refundId = '67275d9606e4b08ee6312360';
    mockRefundModel.findByIdAndDelete.mockReturnValue({
      exec: jest.fn().mockResolvedValue({ deletedCount: 1 }),
    });

    const result = await service.remove(refundId);
    expect(result).toEqual({ deletedCount: 1 });
    expect(mockRefundModel.findByIdAndDelete).toHaveBeenCalledWith(refundId);
  });
});
