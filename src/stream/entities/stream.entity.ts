import  { SuperStream } from 'src/superstream/entities/superstream.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

@Entity('streams')
export class Stream {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // Arts, Science, Commerce

  @ManyToOne(
    () => SuperStream,
    (superstream) => superstream.streams,
    { onDelete: 'CASCADE' },
  )
  superstream: SuperStream;
}