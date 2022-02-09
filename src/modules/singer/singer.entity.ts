import { Entity, OneToMany } from "typeorm";
import { AbstractArtist } from "../common/classes/abstract-artist";
import { SingerAlbum } from "../singer-album/singer-album.entity";


@Entity("singers")
export class Singer extends AbstractArtist {

    @OneToMany(() => SingerAlbum, singerAlbum => singerAlbum.singer, {
        eager: true
    })
    albums: SingerAlbum[];

} 