import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "../auth/entities/user.entity";
import { Track } from "../track/track.entity";

@Entity("playlists")
@Unique(["name"])
export class Playlist extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name:string

    @Column()
    createdAt: Date

    @ManyToOne(() => User, user => user.playlists, {eager: false})
    user: User

    @OneToMany(()=>Track, track=>track.playlist, {eager: true})
    tracks: Track[]
}