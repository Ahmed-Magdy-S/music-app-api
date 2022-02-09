import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { AbstractMusic } from "../common/classes/abstract-music";
import { MusicType } from "../common/enums/music-type.enum";
import { MusicianAlbum } from "../musician-album/musician-album.entity";
import { Track } from "../track/track.entity";

@Entity("musics")
export class Music extends AbstractMusic {
    @Column({ type: "enum", enum: MusicType, array: false })
    type: MusicType


    @ManyToOne(() => MusicianAlbum, musicianAlbum => musicianAlbum.musics, { eager: false })
    musicianAlbum: MusicianAlbum;

    @OneToMany(()=>Track, track=>track.music, {eager: true})
    tracks: Track[]
}