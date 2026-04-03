import { Stream } from 'src/stream/entities/stream.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity('superstreams')
export class SuperStream {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column({ unique: true })
  name!: string; 

  @OneToMany(() => Stream, (stream) => stream.superstream)
  streams!: Stream[];
}