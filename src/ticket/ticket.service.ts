import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Ticket } from './models/ticket.model';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket)
    private ticketModel: typeof Ticket,
  ) {}

  async create(createTicketDto: CreateTicketDto) {
    console.log(JSON.stringify(createTicketDto));
    await this.ticketModel.create({
      title: createTicketDto.title,
      description: createTicketDto.description,
    });
  }

  async findAll() {
    return await this.ticketModel.findAll();
  }

  async findOne(id: number) {
    return await this.ticketModel.findByPk(id);
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    const ticket = await this.ticketModel.findByPk(id);
    await ticket.update(updateTicketDto);
  }

  async remove(id: number) {
    const ticket = await this.ticketModel.findByPk(id);
    await ticket.destroy();
  }
}
