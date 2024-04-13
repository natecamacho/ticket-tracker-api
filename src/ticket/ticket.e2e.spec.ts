import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { TicketModule } from './ticket.module';
import { TicketService } from './ticket.service';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { Ticket } from './models/ticket.model';

describe('Ticket', () => {
  let app: INestApplication;
  const ticketService = {
    findAll: () => {
      return { data: ['test'] };
    },
    create: jest.fn(() => Promise.resolve()),
    findOne: () => {
      return { data: 'test' };
    },
    update: jest.fn(() => Promise.resolve()),
    remove: jest.fn(() => Promise.resolve()),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TicketModule],
    })
      .overrideProvider(TicketService)
      .useValue(ticketService)
      .overrideProvider(getModelToken(Ticket))
      .useValue({})
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('GET /ticket', () => {
    it(`GET /ticket successful response`, () => {
      return request(app.getHttpServer())
        .get('/ticket')
        .expect(200)
        .expect(ticketService.findAll());
    });

    it(`GET /ticket/:id successful response`, () => {
      return request(app.getHttpServer())
        .get('/ticket/1')
        .expect(200)
        .expect(ticketService.findOne());
    });

    it(`GET /ticket/:id bad request`, () => {
      return request(app.getHttpServer())
        .get('/ticket/abc') // not a number ID
        .expect(400);
    });
  });

  describe('POST /ticket', () => {
    it(`POST /ticket successful response`, () => {
      return request(app.getHttpServer())
        .post('/ticket')
        .send({ title: 'test', description: 'test' })
        .expect(201)
        .expect(ticketService.create);
    });

    it(`POST /ticket invalid payload`, () => {
      return request(app.getHttpServer())
        .post('/ticket')
        .send({ description: 'test' }) // title needed
        .expect(400);
    });
  });

  describe('DELETE /ticket/:id', () => {
    it(`DELETE /ticket/:id successful response`, () => {
      return request(app.getHttpServer())
        .delete('/ticket/1')
        .expect(200)
        .expect(ticketService.remove);
    });

    it(`DELETE /ticket/:id bad request`, () => {
      return request(app.getHttpServer())
        .delete('/ticket/abc') // not a number ID
        .expect(400);
    });
  });

  describe('PATCH /ticket/:id', () => {
    it(`PATCH /ticket/:id successful response`, () => {
      return request(app.getHttpServer())
        .patch('/ticket/1')
        .send({ title: 'new title' })
        .expect(200)
        .expect(ticketService.update);
    });

    it(`PATCH /ticket/:id bad request`, () => {
      return request(app.getHttpServer())
        .patch('/ticket/abc') // not a number ID
        .expect(400);
    });

    it(`PATCH /ticket/:id invalid payload`, () => {
      return request(app.getHttpServer())
        .patch('/ticket/1')
        .send({ title: '' })
        .expect(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
