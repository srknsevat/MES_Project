import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('system_license')
export class SystemLicense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  licenseKey: string;

  @Column({ nullable: true })
  validUntil: Date;

  @Column()
  companyName: string;

  @CreateDateColumn()
  createdAt: Date;
}