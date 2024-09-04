import { Controller, Post, Body } from '@nestjs/common';

import { WithdrawalService } from './withdrwal.service';
import { WithdrawalDto } from './dto/create-withdrwal.dto';


@Controller('withdrawal')
export class WithdrawalController {
  constructor(private readonly withdrawalService: WithdrawalService) {}

  @Post()
  async initiateWithdrawal(@Body() withdrawalDto: WithdrawalDto): Promise<any> {
    return this.withdrawalService.initiateWithdrawal(withdrawalDto);
  }
}
