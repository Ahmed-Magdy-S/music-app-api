import { Entity, ManyToOne, OneToMany } from "typeorm";
import { AbstractAlbum } from "../common/classes/abstract-album";
import { Singer } from "../singer/singer.entity";
import { Song } from "../song/song.entity";

@Entity("singer-albums")
export class SingerAlbum extends AbstractAlbum {

    @ManyToOne(() => Singer, singer => singer.albums)
    singer: Singer;

    @OneToMany(() => Song, song => song.singerAlbum, { eager: true })
    songs: Song[]

}