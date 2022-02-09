import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class AbstractMusic extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string 

    @Column()
    description: string 

    @Column()
    artist: string 


    @Column()
    rate: number 
    
    @Column()
    source: string 

    @Column()
    publishedIn: Date 

    @Column()
    image : string 



}