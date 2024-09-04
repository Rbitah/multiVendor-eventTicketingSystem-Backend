import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketManagementDto } from './create-ticket-management.dto';

export class UpdateTicketManagementDto extends PartialType(CreateTicketManagementDto) {}
