import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity(`User`)
export class User {
  @PrimaryGeneratedColumn()
  user_Id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({default:null})
  password_Reset_Code: string;

  @Column()
  role: 'admin' | 'organiser' | 'customer';

  @Column({ nullable: true })
  emailcomfirmationString:string

  
}
