import { Module,  } from '@nestjs/common';

import { HttpModule } from '@nestjs/axios';
import { WithdrawalService } from './withdrwal.service';
import { WithdrawalController } from './withdrwal.controller';

@Module({
  imports: [HttpModule],
  providers: [WithdrawalService],
  controllers: [WithdrawalController],
})
export class WithdrawalModule {}
