import { Test, TestingModule } from '@nestjs/testing';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { Ticket } from './models/ticket.model';

describe('TicketController', () => {
  let ticketController: TicketController;
  let ticketService: TicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketController],
      providers: [
        {
          provide: TicketService,
          useValue: {
            create: jest.fn(() => Promise.resolve()),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(() => Promise.resolve()),
            remove: jest.fn(() => Promise.resolve()),
          },
        },
      ],
    }).compile();

    ticketController = module.get<TicketController>(TicketController);
    ticketService = module.get<TicketService>(TicketService);
  });

  describe('create', () => {
    it('should create a ticket', async () => {
      const createTicketDto = {
        title: 'Test Ticket',
        description: 'This is a test ticket',
      };

      await ticketController.create(createTicketDto);

      expect(ticketService.create).toHaveBeenCalledWith(createTicketDto);
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
      jest.spyOn(ticketService, 'findAll').mockResolvedValue(ticketList);

      const results = await ticketController.findAll();

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

      jest.spyOn(ticketService, 'findOne').mockResolvedValue(ticket1);

      const result = await ticketController.findOne('1');

      expect(result).toEqual(ticket1);
    });
  });

  describe('update', () => {
    it('should update ticket', async () => {
      const updateTicketDto = {
        title: 'Updated Ticket',
      };

      await ticketController.update('1', updateTicketDto);

      expect(ticketService.update).toHaveBeenCalledWith(1, updateTicketDto);
    });
  });

  describe('remove', () => {
    it('should remove ticket', async () => {
      await ticketController.remove('1');

      expect(ticketService.remove).toHaveBeenCalledWith(1);
    });
  });
});
