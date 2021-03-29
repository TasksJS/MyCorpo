import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Evenement } from './evenement.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;

  @OneToMany(() => Evenement, (Evenement) => Evenement.creator, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    eager: true,
  })
  evenements: Evenement[];
}
