import { IsString, IsNotEmpty, IsMobilePhone, IsNumber } from 'class-validator';

export class WithdrawalDto {
  @IsString()
  @IsMobilePhone()
  readonly mobile: string;

  @IsString()
  @IsNotEmpty({ message: "Kindly submit the ref_id of the mobile money operator." })
 mobile_money_operator_ref_id?: string;

  @IsNumber({}, { message: "The amount field is required." })
  readonly amount: number;

  @IsString()
  @IsNotEmpty({ message: "The charge id field is required." })
  readonly charge_id: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly first_name: string;

  @IsString()
  readonly last_name: string;

  @IsString()
  readonly transaction_status: string;
}
