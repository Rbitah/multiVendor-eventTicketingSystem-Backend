import { Module } from '@nestjs/common';
import { EventManagementService } from './event-management.service';
import { EventManagementController } from './event-management.controller';

@Module({
  controllers: [EventManagementController],
  providers: [EventManagementService],
})
export class EventManagementModule {}
