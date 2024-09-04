import { Injectable } from '@nestjs/common';
import { CreateEventManagementDto } from './dto/create-event-management.dto';
import { UpdateEventManagementDto } from './dto/update-event-management.dto';

@Injectable()
export class EventManagementService {
  create(createEventManagementDto: CreateEventManagementDto) {
    return 'This action adds a new eventManagement';
  }

  findAll() {
    return `This action returns all eventManagement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eventManagement`;
  }

  update(id: number, updateEventManagementDto: UpdateEventManagementDto) {
    return `This action updates a #${id} eventManagement`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventManagement`;
  }
}
