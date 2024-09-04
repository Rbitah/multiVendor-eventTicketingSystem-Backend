import { Injectable } from '@nestjs/common';
import { CreateTicketManagementDto } from './dto/create-ticket-management.dto';
import { UpdateTicketManagementDto } from './dto/update-ticket-management.dto';

@Injectable()
export class TicketManagementService {
  create(createTicketManagementDto: CreateTicketManagementDto) {
    return 'This action adds a new ticketManagement';
  }

  findAll() {
    return `This action returns all ticketManagement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticketManagement`;
  }

  update(id: number, updateTicketManagementDto: UpdateTicketManagementDto) {
    return `This action updates a #${id} ticketManagement`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticketManagement`;
  }
}
