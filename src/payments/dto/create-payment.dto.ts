// src/payments/dto/create-payment.dto.ts

import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class PaymentsDto {
  @IsNotEmpty()
  @IsString()
  amount: string;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  tx_ref: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsString()
  description?: string;
}


