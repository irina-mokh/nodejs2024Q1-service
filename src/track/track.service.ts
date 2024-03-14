import { Injectable } from '@nestjs/common';
import {
  CreateTrackDto as C,
  UpdateTrackDto as U,
  TrackDto as T,
} from './track.dto';
import { DBService } from 'src/db/db.service';

@Injectable()
export class TrackService {
  constructor(readonly db: DBService) {}

  async getAll() {
    return await this.db.track.findMany();
  }

  async getById(id: string) {
    return this.db.track.findUnique({
      where: { id },
    });
  }

  async create(dto: C) {
    return await this.db.track.create({
      data: dto,
    });
  }

  async update(id: string, dto: U) {
    const updItem = await this.db.track.update({
      where: { id },
      data: dto,
    });

    return updItem;
  }

  async delete(id: string) {
    await this.db.track.delete({ where: { id } });
  }
  // removeFromFavs(id: string) {
  //   const items = db.favorites.tracks;
  //   if (items.has(id)) {
  //     items.delete(id);
  //   }
  // }
}
