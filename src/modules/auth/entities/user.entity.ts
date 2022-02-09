import { Auth } from 'src/modules/common/classes/auth';
import { Role } from 'src/modules/common/enums/role.enum';
import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Profile } from 'src/modules/profile/entities/profile.entity';
import * as bcrypt from "bcryptjs"
import { Playlist } from 'src/modules/playlist/playlist.entity';

@Entity("users")
@Unique(["email", "username"])

export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    name: string;

    @Column('text')
    email: string;

    @Column('text')
    username: string;

    @Column('text')
    password: string;

    @Column()
    salt: string;

    @Column({
        type: "enum",
        enum: Role,
        array: true
    })
    roles: Role[];

    @Column("simple-json")
    auth: Auth;

    @OneToOne(() => Profile, profile => profile.user)
    @JoinColumn()
    profile: Profile;

    @OneToMany(() => Playlist, playlist => playlist.user, {eager: true})
    playlists: Playlist[]

    async validatePassword(enteredPassword: string): Promise<boolean> {
        const hash = await bcrypt.hash(enteredPassword, this.salt)
        return this.password === hash;
    }

}