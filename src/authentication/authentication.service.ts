import { Injectable } from '@nestjs/common';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { MailService } from 'src/mail/mail.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User)
    private readonly authenticationRepository: Repository<User>,
    private readonly mailService: MailService,
  ) {}

  async create(createAuthenticationDto: CreateAuthenticationDto) {
    try {
      
      let newUser = await this.authenticationRepository.save(
        createAuthenticationDto,
      );

      
      const emailConfirmationString = uuidv4();

      
      newUser.emailcomfirmationString = emailConfirmationString;
      newUser = await this.authenticationRepository.save(newUser);

      await this.mailService.sendEmailcomfirmation(
        newUser.email,
        emailConfirmationString,
      );

      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async validateUser(
    email: string,
    password: string,
    username: string,
  ): Promise<User | string> {
    try {
      const ValidUser = await this.authenticationRepository.findOne({
        where: [{ email: email }, { userName: username }],
      });
      if (ValidUser && ValidUser.password === password) {
        return ValidUser;
      }
      return `bad auth`;
    } catch (error) {
      return `error ${error.message}`;
    }
  }

  async login(ValidUser: User): Promise<string> {
    return `welcome ${ValidUser.userName}`;
  }

  async generatePasswordResetCode(email: string): Promise<void> {
    const user = await this.authenticationRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new Error(`user with email: ${email} not found `);
    }

    const reset_Code = Math.floor(100000 + Math.random() * 900000).toString();
    user.password_Reset_Code = reset_Code;

    await this.authenticationRepository.save(user);
    await this.mailService.sendResetCodeToEmail(email, reset_Code);
  }

  async changePassword(
    email: string,
    reset_Code: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.authenticationRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new Error(`no user found`);
    }

    if (user.password_Reset_Code !== reset_Code) {
      throw new Error(`invalid resetCode`);
    }
    user.password = newPassword;
    user.password_Reset_Code = null;
    await this.authenticationRepository.save(user);
  }

  async verifyEmail(emailcomfirmationString: string) {
    {const user = await this.authenticationRepository.findOne({
      where: { emailcomfirmationString: emailcomfirmationString },
    });
    if (!user) {
      throw new Error(`no user found `);
    }
    user.isVerified = true;
    user.emailcomfirmationString = emailcomfirmationString;
    await this.authenticationRepository.save(user);
    return { message: 'Email successfully verified!' };
    user.emailcomfirmationString=null,
  await this.authenticationRepository.save(user)}
  }
  catch(error) {
    console.error('Error verifying email:', error);
    throw new Error(`Failed to verify email: ${error.message}`);
  }

  async findAll() {
    return this.authenticationRepository.find();
  }

  findOne(id: number) {
    return this.authenticationRepository.findOne({ where: { user_Id: id } });
  }

  async update(id: number, updateAuthenticationDto: UpdateAuthenticationDto) {
    const user = await this.authenticationRepository.findOne({
      where: { user_Id: id },
    });

    if (!user) {
      return `user with id: ${id} not found`;
    }

    Object.assign(user, updateAuthenticationDto);

    return this.authenticationRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.authenticationRepository.findOne({
      where: { user_Id: id },
    });
    return;
  }
}
