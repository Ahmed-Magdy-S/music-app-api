import {  Entity, OneToMany } from "typeorm";
import { AbstractArtist } from "../common/classes/abstract-artist";
import { MusicianAlbum } from "../musician-album/musician-album.entity";


@Entity("musicians")
export class Musician extends AbstractArtist {
 
    @OneToMany(() => MusicianAlbum, musicianAlbum => musicianAlbum.musician, {
        eager: true
    })
    albums: MusicianAlbum[];
}