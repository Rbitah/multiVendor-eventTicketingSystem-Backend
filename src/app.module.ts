import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentsModule } from './payments/payments.module';
import { TicketManagementModule } from './ticket-management/ticket-management.module';
import { EventManagementModule } from './event-management/event-management.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [PaymentsModule, TicketManagementModule, EventManagementModule, AuthenticationModule, UsersModule, MailModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
