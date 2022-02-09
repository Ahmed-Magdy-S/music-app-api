import { User } from 'src/modules/auth/entities/user.entity';
import { Gender } from 'src/modules/common/enums/gender.enum';
import { Favorite } from 'src/modules/favorite/favorite.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToOne, JoinColumn, BaseEntity } from 'typeorm';


@Entity("profiles")
@Unique(["phone"])
export class Profile extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    firstName: string;

    @Column("text")
    lastName: string;

    @Column({ type: "enum", enum: Gender, array: false })
    gender: Gender;

    @Column("integer")
    age: number;

    @Column("text")
    country: string;

    @Column("text")
    city: string;

    @Column("text")
    address: string;

    @Column("text")
    phone: string;
    
    @OneToOne(() => User, user => user.profile)
    user: User;

    @OneToOne(() => Favorite, favorite => favorite.profile)
    @JoinColumn()
    favorite: Favorite;

}