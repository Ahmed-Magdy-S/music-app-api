import { EntityRepository, Repository } from "typeorm";
import { Playlist } from "./playlist.entity";

@EntityRepository(Playlist)
export class PlaylistRepository extends Repository<Playlist>{
    async getUserPlaylists(userId: number): Promise<Playlist[]> {
        const query = this.createQueryBuilder("playlist").select()
        if (userId) query.where("playlist.userId = :userId", { userId })
        else return []

        const playlists = await query.leftJoinAndSelect("playlist.tracks", "tracks").getMany()
        return playlists

    }
}