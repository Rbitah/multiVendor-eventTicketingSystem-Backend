import { PartialType } from '@nestjs/mapped-types';
import { WithdrawalDto } from './create-withdrwal.dto';


export class UpdateWithdrwalDto extends PartialType(WithdrawalDto) {}
