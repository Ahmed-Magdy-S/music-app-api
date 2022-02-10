import { EntityRepository, Repository } from "typeorm"
import { SongLanguage } from "../common/enums/song-language.enum"
import { SongType } from "../common/enums/song-type.enum"
import { Song } from "./song.entity"

@EntityRepository(Song)
export class SongRepository extends Repository<Song>{

    async getLimitedSongs(limit: number): Promise<Song[]> {
        const query = this.createQueryBuilder("song").select()

        if (limit) query.limit(limit)

        const songs = await query.leftJoinAndSelect("song.tracks", "tracks").getMany()

        return songs
    }

    async getFilteredSongs(limit: number, type: SongType, rate: number, language:SongLanguage): Promise<Song[]> {
        const query = this.createQueryBuilder("song").select()

        if (limit) query.limit(limit)
        if (type) query.where("song.type LIKE :type", { type })
        if (rate) query.andWhere("song.rate = :rate", { rate })
        if (language) query.andWhere("song.language LIKE :language", { language })

        const songs = await query.leftJoinAndSelect("song.tracks", "tracks").getMany()

        return songs
    }

}