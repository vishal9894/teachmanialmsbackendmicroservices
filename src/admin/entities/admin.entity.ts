// src/admin/entities/admin.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  phone_number!: string;
  @Column({ nullable: true })
  image!: string;

  @Column({ select: false })
  password!: string;

  @Column({ default: true })
  status!: boolean;

  /* ✅ FOREIGN KEY COLUMN */
  @Column({ nullable: true })
  roleId!: number;

  /* ✅ RELATION FIXED */
  @ManyToOne(() => Role, (role) => role.admins)
  @JoinColumn({ name: 'roleId' })
  role!: Role;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
