import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { PaymentsDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly httpService: HttpService) {}

  private generateUniqueTransactionReference(): string {
    return uuidv4();
  }

  async processPayment(paymentsDto: PaymentsDto): Promise<any> {
    paymentsDto.tx_ref = this.generateUniqueTransactionReference();

    const options = {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: 'Bearer sec-test-p4skvgLUHNJfxJJn17TGOIBaQOaeEyvS',
      },
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post('https://api.paychangu.com/payment', paymentsDto, options),
      );
      const data = response.data;

      if (data.status === 'success') {
        return {
          statusCode: 200,
          message: 'Payment initiated successfully.',
          data: data.data,
        };
      } else {
        throw new Error(data.message || 'Payment initiation failed.');
      }
    } catch (error) {
      console.error('Error processing payment:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'An error occurred while processing payment.');
    }
  }

  async getPaymentStatus(tx_ref: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`https://api.paychangu.com/payment/status/${tx_ref}`),
      );
      const data = response.data;

      if (data.status === 'success') {
        return {
          statusCode: 200,
          message: 'Payment status retrieved successfully.',
          data: data.data,
        };
      } else {
        throw new Error(data.message || 'Failed to retrieve payment status.');
      }
    } catch (error) {
      console.error('Error retrieving payment status:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'An error occurred while retrieving payment status.');
    }
  }

 
}
