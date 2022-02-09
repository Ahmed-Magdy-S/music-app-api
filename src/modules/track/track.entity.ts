import { BaseEntity, Column, Entity, Generated, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Favorite } from "../favorite/favorite.entity";
import { Music } from "../music/music.entity";
import { Playlist } from "../playlist/playlist.entity";
import { Song } from "../song/song.entity";

@Entity("tracks")
export class Track extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Generated()
    @Column()
    index: number

    @Column()
    title: string

    @Column()
    link: string

    @ManyToOne(() => Playlist, playlist => playlist.tracks, { eager: false })
    playlist: Playlist

    @ManyToOne(() => Favorite, favorite => favorite.tracks, { eager: false })
    favorite: Favorite


    @ManyToOne(() => Song, song => song.tracks, { eager: false })
    song: Song

    @ManyToOne(() => Music, music => music.tracks, { eager: false })
    music: Music

}