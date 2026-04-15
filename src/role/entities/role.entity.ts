import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import { Permission } from 'src/permission/entities/permission.entity';
import { Admin } from 'src/admin/entities/admin.entity';

@Entity('roles')
export class Role {
  // ✅ UUID PRIMARY KEY
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', nullable: true })
  organizationId?: string;

  @Column({ unique: true })
  name!: string;

  @Column({ nullable: true })
  description!: string;

  /* ✅ ROLE → PERMISSIONS */
  @ManyToMany(() => Permission, { eager: true })
  @JoinTable({
    name: 'role_permissions',
  })
  permissions!: Permission[];

  /* ✅ ROLE → ADMINS */
  @OneToMany(() => Admin, (admin) => admin.role)
  admins!: Admin[];
}
