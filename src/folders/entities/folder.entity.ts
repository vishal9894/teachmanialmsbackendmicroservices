import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('folders')
export class Folder {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', nullable: true })
  organizationId?: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  image!: string;

  @Column({ type: 'uuid', nullable: true })
  parentId!: string | null;

  @CreateDateColumn()
  createAt!: Date;
}
