import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id?: string;

  @Column()
  @Expose()
  title: string;

  @Column()
  @Expose()
  content: string;

  @Column({ type: 'numeric', precision: 12, scale: 8, nullable: true })
  @Expose()
  lat: number;

  @Column({ type: 'numeric', precision: 12, scale: 8, nullable: true })
  @Expose()
  long: number;

  @Column()
  @Expose()
  image_url: string;
}
