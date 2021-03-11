import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Evenement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp' })
  date: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;

  @Column({ default: true })
  isActive: boolean;
}
