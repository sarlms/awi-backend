import { Test, TestingModule } from '@nestjs/testing';
import { DepositFeePaymentService } from './depositFeePayment.service';
import { getModelToken } from '@nestjs/mongoose';
import { DepositFeePayment } from '../schemas/depositFeePayment.schema';
import { Seller } from '../schemas/seller.schema';
import { Session } from '../schemas/session.schema';
import { Manager } from '../schemas/manager.schema';
import { Types } from 'mongoose';

describe('DepositFeePaymentService', () => {
  let service: DepositFeePaymentService;

  const mockDepositFeePaymentModel = {
    create: jest.fn(),
    findById: jest.fn().mockReturnThis(),
    find: jest.fn().mockReturnThis(),
    findByIdAndUpdate: jest.fn().mockReturnThis(),
    findByIdAndDelete: jest.fn().mockReturnThis(),
    exec: jest.fn(),
  };

  const mockSellerModel = {};
  const mockSessionModel = {};
  const mockManagerModel = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepositFeePaymentService,
        {
          provide: getModelToken(DepositFeePayment.name),
          useValue: mockDepositFeePaymentModel,
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

    service = module.get<DepositFeePaymentService>(DepositFeePaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a deposit fee payment', async () => {
    const paymentData = {
      sellerId: new Types.ObjectId('6726abb23fdf823146d55a4b'),
      sessionId: new Types.ObjectId('67275d9606e4b08ee6312360'),
      managerId: new Types.ObjectId('6720ca0bd905cf2bdf52678e'), // Utilise ObjectId ici
      depositFeePayed: 100,
      depositDate: new Date(),
    };
  
    mockDepositFeePaymentModel.create.mockResolvedValue(paymentData);
  
    const result = await service.create(paymentData, '6720ca0bd905cf2bdf52678e');
    expect(result).toEqual(paymentData);
    expect(mockDepositFeePaymentModel.create).toHaveBeenCalledWith({
      ...paymentData,
      managerId: new Types.ObjectId('6720ca0bd905cf2bdf52678e'), // Compare avec ObjectId
    });
  });

  it('should return all deposit fee payments', async () => {
    const payments = [{ depositFeePayed: 100 }, { depositFeePayed: 150 }];
    mockDepositFeePaymentModel.find.mockReturnValue({
      exec: jest.fn().mockResolvedValue(payments),
    });

    const result = await service.findAll();
    expect(result).toEqual(payments);
    expect(mockDepositFeePaymentModel.find).toHaveBeenCalled();
  });

  it('should return deposit fee payments of a seller', async () => {
    const sellerId = '6726abb23fdf823146d55a4b';
    const payments = [{ depositFeePayed: 100 }, { depositFeePayed: 150 }];
    mockDepositFeePaymentModel.find.mockReturnValue({
      exec: jest.fn().mockResolvedValue(payments),
    });

    const result = await service.findBySellerId(sellerId);
    expect(result).toEqual(payments);
    expect(mockDepositFeePaymentModel.find).toHaveBeenCalledWith({ sellerId });
  });

  it('should return deposit fee payments of a seller for a specific session', async () => {
    const sellerId = '6726abb23fdf823146d55a4b';
    const sessionId = '67275d9606e4b08ee6312360';
    const payments = [{ depositFeePayed: 100 }];
    mockDepositFeePaymentModel.find.mockReturnValue({
      exec: jest.fn().mockResolvedValue(payments),
    });

    const result = await service.findBySellerAndSession(sellerId, sessionId);
    expect(result).toEqual(payments);
    expect(mockDepositFeePaymentModel.find).toHaveBeenCalledWith({
      sellerId,
      sessionId,
    });
  });

  it('should return a deposit fee payment by its id', async () => {
    const paymentId = '67275d9606e4b08ee6312360';
    const payment = { depositFeePayed: 100 };
    mockDepositFeePaymentModel.findById.mockReturnValue({
      exec: jest.fn().mockResolvedValue(payment),
    });

    const result = await service.findOne(paymentId);
    expect(result).toEqual(payment);
    expect(mockDepositFeePaymentModel.findById).toHaveBeenCalledWith(paymentId);
  });

  it('should delete a deposit fee payment', async () => {
    const paymentId = '67275d9606e4b08ee6312360';
    mockDepositFeePaymentModel.findByIdAndDelete.mockReturnValue({
      exec: jest.fn().mockResolvedValue({ deletedCount: 1 }),
    });

    const result = await service.remove(paymentId);
    expect(result).toEqual({ deletedCount: 1 });
    expect(mockDepositFeePaymentModel.findByIdAndDelete).toHaveBeenCalledWith(paymentId);
  });
});
