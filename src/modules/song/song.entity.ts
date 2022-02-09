import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { AbstractMusic } from "../common/classes/abstract-music";
import { SongLanguage } from "../common/enums/song-language.enum";
import { SongType } from "../common/enums/song-type.enum";
import { SingerAlbum } from "../singer-album/singer-album.entity";
import { Track } from "../track/track.entity";

@Entity("songs")
export class Song extends AbstractMusic {

    @Column({ type: "enum", enum: SongType, array: false })
    type: SongType

    @Column({type: "enum", enum: SongLanguage, array: false})
    language: SongLanguage

    @ManyToOne(() => SingerAlbum, singerAlbum => singerAlbum.songs , {eager: false})
    singerAlbum: SingerAlbum;

    @OneToMany(()=>Track, track=>track.song, {eager: true})
    tracks: Track[]

}