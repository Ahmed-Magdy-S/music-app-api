import { Entity, ManyToOne, OneToMany } from "typeorm";
import { AbstractAlbum } from "../common/classes/abstract-album";
import { Music } from "../music/music.entity";
import { Musician } from "../musician/musician.entity";

@Entity("musician-albums")
export class MusicianAlbum extends AbstractAlbum {


    @ManyToOne(() => Musician, musician => musician.albums)
    musician: Musician;

    @OneToMany(() => Music, music => music.musicianAlbum , {eager: true})
    musics: Music[];
}   