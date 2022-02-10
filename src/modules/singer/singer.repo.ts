import { EntityRepository, Repository } from "typeorm";
import { ArtistType } from "../common/enums/artist-type.enum";
import { Gender } from "../common/enums/gender.enum";
import { Singer } from "./singer.entity";

@EntityRepository(Singer)
export class SingerRepository extends Repository<Singer> {

    async getLimitedSingers(limit: number): Promise<Singer[]> {
        const query = this.createQueryBuilder("singer").select()
        if (limit) {
            query.limit(limit)
        }
        const singers = await query.leftJoinAndSelect("singer.albums", "singer-albums").getMany()
        return singers
    }

    async getFilteredSingers(limit: number, nationality: string, type: ArtistType, gender: Gender): Promise<Singer[]> {
        const query = this.createQueryBuilder("singer")

        if (limit) query.limit(limit)

        if (nationality) query.where("singer.nationality LIKE :nationality", { nationality })

        if (type) query.andWhere("singer.type LIKE :type", { type })

        if (gender) query.andWhere("singer.gender LIKE :gender", { gender })

        const singers = await query.leftJoinAndSelect("singer.albums", "singer-albums").getMany()

        return singers

    }
}

