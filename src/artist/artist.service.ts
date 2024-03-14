import { Injectable } from '@nestjs/common';
import {
  CreateArtistDto as C,
  UpdateArtistDto as U,
  ArtistDto as T,
} from './artist.dto';
import { DBService } from 'src/db/db.service';

@Injectable()
export class ArtistService {
  constructor(readonly db: DBService) {}

  async getAll() {
    return await this.db.artist.findMany();
  }

  async getById(id: string) {
    return this.db.artist.findUnique({
      where: { id },
    });
  }

  async create(dto: C) {
    return await this.db.artist.create({
      data: dto,
    });
  }

  async update(id: string, dto: U) {
    const updItem = await this.db.artist.update({
      where: { id },
      data: dto,
    });

    return updItem;
  }

  async delete(id: string) {
    await this.db.artist.delete({ where: { id } });
  }

  // removeArtistId(id: string) {
  //   this.db.album.forEach((album) => {
  //     if (album.artistId === id) album.artistId = null;
  //   });

  //   this.db.track.forEach((track) => {
  //     if (track.artistId === id) track.artistId = null;
  //   });
  // }

  // removeFromFavs(id: string) {
  //   const items = db.favorites.artists;
  //   if (items.has(id)) {
  //     items.delete(id);
  //   }
  // }
}
