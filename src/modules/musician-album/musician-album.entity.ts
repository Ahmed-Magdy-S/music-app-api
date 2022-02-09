import { Entity, ManyToOne } from "typeorm";
import { AbstractAlbum } from "../common/classes/abstract-album";
import { Musician } from "../musician/musician.entity";

@Entity("musician-albums")
export class MusicianAlbum extends AbstractAlbum {


    @ManyToOne(() => Musician, musician => musician.albums)
    musician: Musician;
}  