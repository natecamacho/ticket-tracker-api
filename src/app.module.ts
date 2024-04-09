import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketModule } from './ticket/ticket.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ticket } from './ticket/models/ticket.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'ZFwVACYSD6bK5f',
      database: 'ticket-tracker',
      models: [Ticket],
    }),
    TicketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
