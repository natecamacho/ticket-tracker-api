import { Test, TestingModule } from '@nestjs/testing';
import { TicketService } from './ticket.service';
import { getModelToken } from '@nestjs/sequelize';
import { Ticket } from './models/ticket.model';

describe('TicketService', () => {
  let ticketService: TicketService;

  const mockTicketModel = {
    create: jest.fn(() => Promise.resolve()),
    findAll: jest.fn(),
    findByPk: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketService,
        {
          provide: getModelToken(Ticket),
          useValue: mockTicketModel,
        },
      ],
    }).compile();

    ticketService = module.get<TicketService>(TicketService);
  });

  describe('create', () => {
    it('should create a ticket', async () => {
      const createTicketDto = {
        title: 'Test Ticket',
        description: 'This is a test ticket',
      };

      await ticketService.create(createTicketDto);

      expect(mockTicketModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          title: createTicketDto.title,
          description: createTicketDto.description,
        }),
      );
    });
  });

  describe('findAll', () => {
    it('should return all tickets', async () => {
      const ticket1 = {
        id: 1,
        title: 'Test Ticket',
        description: 'This is a test ticket',
      } as Ticket;

      const ticket2 = {
        id: 2,
        title: 'Test Ticket 2',
        description: 'This is a test ticket 2',
      } as Ticket;

      const ticketList: Ticket[] = [ticket1, ticket2];
      jest.spyOn(mockTicketModel, 'findAll').mockResolvedValue(ticketList);

      const results = await ticketService.findAll();

      expect(results).toEqual(ticketList);
    });
  });

  describe('findOne', () => {
    it('should return single tickets', async () => {
      const ticket1 = {
        id: 1,
        title: 'Test Ticket',
        description: 'This is a test ticket',
      } as Ticket;

      jest.spyOn(mockTicketModel, 'findByPk').mockResolvedValue(ticket1);

      const result = await ticketService.findOne(1);

      expect(result).toEqual(ticket1);
    });
  });

  describe('update', () => {
    it('should update ticket', async () => {
      const updateTicketDto = {
        title: 'Updated Ticket',
      };

      const resultTicket = {
        id: 1,
        update: jest.fn(),
      };

      jest.spyOn(mockTicketModel, 'findByPk').mockResolvedValue(resultTicket);

      await ticketService.update(1, updateTicketDto);

      expect(mockTicketModel.findByPk).toHaveBeenCalledWith(1);
      expect(resultTicket.update).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove ticket', async () => {
      const resultTicket = {
        id: 1,
        destroy: jest.fn(),
      };

      jest.spyOn(mockTicketModel, 'findByPk').mockResolvedValue(resultTicket);

      await ticketService.remove(1);

      expect(mockTicketModel.findByPk).toHaveBeenCalledWith(1);
      expect(resultTicket.destroy).toHaveBeenCalled();
    });
  });
});
