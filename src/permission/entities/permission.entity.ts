import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from '../../role/entities/role.entity';

@Entity({ name: 'permissions' })
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  permission_group: string;

  @Column({ default: 'api' })
  guard_name: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}