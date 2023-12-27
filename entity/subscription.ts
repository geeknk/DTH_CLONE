import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { User } from "./user";
import { Plan } from "./plan";

@Entity()
export class Subscription extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  startDate!: Date;
  
  @Column()
  expiryDate!: Date;
  
  @Column()
  plansId!: number;
  
  @Column()
  userId!: number;

  @ManyToOne(() => Plan, (plan) => plan.subscribe)
  plans!: Plan;

  @ManyToOne(() => User, (user) => user.subscribe)
  user!: User;
}
