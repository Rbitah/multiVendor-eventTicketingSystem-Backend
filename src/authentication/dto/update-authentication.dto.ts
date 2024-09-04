import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthenticationDto } from './create-authentication.dto';
import { IsNotEmpty, isNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateAuthenticationDto extends PartialType(CreateAuthenticationDto) {
    @IsString()
    username:string

    @IsString()
    @IsNotEmpty()
    firstName:string

    @IsString()
    Lastname:string

    @IsString()
    password:string

    @IsString()
    role: 'admin' | 'organiser' | 'customer';

    @IsNumber()
    password_Reset_Code: number;

}
