import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketManagementService } from './ticket-management.service';
import { CreateTicketManagementDto } from './dto/create-ticket-management.dto';
import { UpdateTicketManagementDto } from './dto/update-ticket-management.dto';

@Controller('ticket-management')
export class TicketManagementController {
  constructor(private readonly ticketManagementService: TicketManagementService) {}

  @Post()
  create(@Body() createTicketManagementDto: CreateTicketManagementDto) {
    return this.ticketManagementService.create(createTicketManagementDto);
  }

  @Get()
  findAll() {
    return this.ticketManagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketManagementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketManagementDto: UpdateTicketManagementDto) {
    return this.ticketManagementService.update(+id, updateTicketManagementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketManagementService.remove(+id);
  }
}
