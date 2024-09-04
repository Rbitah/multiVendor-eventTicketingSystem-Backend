import { lastValueFrom } from "rxjs";
import { WithdrawalDto } from "./dto/create-withdrwal.dto";
import { HttpService } from "@nestjs/axios";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class WithdrawalService {
  private readonly baseUrl = 'https://api.paychangu.com/mobile-money/payouts/initialize';
  private readonly apiKey = 'sec-test-p4skvgLUHNJfxJJn17TGOIBaQOaeEyvS';

  constructor(private readonly httpService: HttpService) {}

  async initiateWithdrawal(withdrawalDto: WithdrawalDto): Promise<any> {
    
    if (withdrawalDto.mobile.startsWith('9')) {
      withdrawalDto.mobile_money_operator_ref_id = '20be6c20-adeb-4b5b-a7ba-0769820df4fb';
    } else if (withdrawalDto.mobile.startsWith('8')) {
      withdrawalDto.mobile_money_operator_ref_id = '27494cb5-ba9e-437f-a114-4e7a7686bcca';
    }

    try {
      const response = await lastValueFrom(
        this.httpService.post(this.baseUrl, withdrawalDto, {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }),
      );

      const { status, message, data } = response.data;

      if (status === 'success') {
        return { status, message, data };
      } else {
        throw new HttpException(message, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to initiate withdrawal';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
  }
}
