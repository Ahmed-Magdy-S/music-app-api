import { Gender } from 'src/modules/common/enums/gender.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity("profiles")
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ type: "enum", enum: Gender, array: false })
    gender: Gender;

    @Column("integer")
    age: number;

    @Column()
    country: string;

    @Column()
    city: string;

    @Column()
    address: string;

    @Column()
    phone: string;
}