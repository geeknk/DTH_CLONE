import {Entity,Column,PrimaryGeneratedColumn,BaseEntity, OneToMany, ManyToOne} from "typeorm"
import { Channel } from "./channel";
import { Subscription } from "./subscription";

@Entity()
export class Plan {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    category!:string;

    @Column()
    duration!:string;

    @Column()
    price!:string;
    
    @OneToMany(() => Subscription, subscribe => subscribe.plans)
    subscribe!:Subscription;

    @OneToMany(() => Channel, channel => channel.plan)
    channels!:Channel;
    
}