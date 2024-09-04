import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsDto } from './dto/create-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('send')
  async processPayment(@Body() paymentsDto: PaymentsDto) {
    return this.paymentsService.processPayment(paymentsDto);
  }

  @Get('status/:tx_ref')
  async getPaymentStatus(@Param('tx_ref') tx_ref: string) {
    return this.paymentsService.getPaymentStatus(tx_ref);
  }
}
