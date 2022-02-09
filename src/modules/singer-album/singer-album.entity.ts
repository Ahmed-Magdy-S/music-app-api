import { Entity, ManyToOne } from "typeorm";
import { AbstractAlbum } from "../common/classes/abstract-album";
import { Singer } from "../singer/singer.entity";

@Entity("singer-albums")
export class SingerAlbum extends AbstractAlbum {

    @ManyToOne(() => Singer, singer => singer.albums)
    singer: Singer;
}