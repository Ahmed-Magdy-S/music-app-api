import { BaseEntity, Entity, PrimaryGeneratedColumn, OneToOne, OneToMany } from "typeorm";
import { Profile } from "../profile/entities/profile.entity";
import { Track } from "../track/track.entity";

@Entity("favorite-list")
export class Favorite extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Profile, profile => profile.favorite)
    profile: Profile

    @OneToMany(()=>Track, track=>track.favorite, {eager: true})
    tracks: Track[]
}