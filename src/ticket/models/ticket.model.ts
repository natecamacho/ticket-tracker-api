import { Optional } from 'sequelize';
import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

export interface TicketAttributes {
  id: number;
  title: string;
  description: string;
}

export interface TicketCreationAttributes
  extends Optional<TicketAttributes, 'id'> {}

@Table({ timestamps: false })
export class Ticket extends Model<TicketAttributes, TicketCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  title: string;

  @Column
  description: string;
}
