import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  create(@Body() createAuthenticationDto: CreateAuthenticationDto) {
    return this.authenticationService.create(createAuthenticationDto);
  }

  @Post('/login')
  async login(
    @Body() body: { email: string; password: string; username: string },
  ) {
    try {
      const { email, username, password } = body;
      const loginUser = await this.authenticationService.validateUser(
        email,
        password,
        username,
      );

      if (typeof loginUser === 'string') {
        return { message: loginUser };
      }

      if (loginUser) {
        return this.authenticationService.login(loginUser);
      } else {
        return `bad auth`;
      }
    } catch (error) {
      {
        message: `Failed to login: ${error.message}`;
      }
    }
  }

  @Post(`/resetPassword`)
  async resetPasswordCode(@Body('email') email: string) {
    try {
      await this.authenticationService.generatePasswordResetCode(email);
      return { message: `resetCode sent to: ${email}` };
    } catch {
      return { message: 'error no user found' };
    }
  }

  @Post(`/changePassword`)
  async changePassword(
    @Body('email') email: string,
    @Body('resetCode') resetCode: string,
    @Body('newPassword') newPassword: string,
  ) {
    try {
      await this.authenticationService.changePassword(
        email,
        resetCode,
        newPassword,
      );
      return { message: 'Password successfully changed' };
    } catch (error) {
      {
        message: error.message;
      }
    }
  }

  @Get(`/verify-email/:emailConfirmationString`)
  async verifyEmail(@Param('emailConfirmationString') emailConfirmationString: string) {
    return this.authenticationService.verifyEmail(emailConfirmationString);
  }
  














  @Get('allUsers')
  findAll() {
    return this.authenticationService.findAll();
  }

  @Get('/oneUser/:id')
  findOne(@Param('id') id: string) {
    return this.authenticationService.findOne(+id);
  }

  @Patch('/updateUser/:id')
  update(
    @Param('id') id: string,
    @Body() updateAuthenticationDto: UpdateAuthenticationDto,
  ) {
    return this.authenticationService.update(+id, updateAuthenticationDto);
  }

  @Delete('/deleteUser/:id')
  remove(@Param('id') id: string) {
    return this.authenticationService.remove(+id);
  }
}
