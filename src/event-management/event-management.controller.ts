import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventManagementService } from './event-management.service';
import { CreateEventManagementDto } from './dto/create-event-management.dto';
import { UpdateEventManagementDto } from './dto/update-event-management.dto';

@Controller('event-management')
export class EventManagementController {
  constructor(private readonly eventManagementService: EventManagementService) {}

  @Post()
  create(@Body() createEventManagementDto: CreateEventManagementDto) {
    return this.eventManagementService.create(createEventManagementDto);
  }

  @Get()
  findAll() {
    return this.eventManagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventManagementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventManagementDto: UpdateEventManagementDto) {
    return this.eventManagementService.update(+id, updateEventManagementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventManagementService.remove(+id);
  }
}
