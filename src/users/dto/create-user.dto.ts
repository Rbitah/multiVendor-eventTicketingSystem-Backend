import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';


export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  userName: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsBoolean()
  isVerified: boolean;

  @IsString()
  password_Reset_Code: string;

  @IsString()
  emailcomfirmationString:string

  @IsString()
  role: 'admin' | 'organiser' | 'customer';
}
