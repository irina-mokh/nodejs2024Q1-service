import { Injectable } from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { USER_ID } from 'src/user/user.controller';

@Injectable()
export class FavsService {
  constructor(readonly db: DBService) {}

  async getAll() {
    const favs = await this.db.favorites.findMany({
      where: { id: USER_ID },
      include: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });
    return {
      ...favs[0],
    };
  }

  async addItem(id: string, key: string) {
    await this.db.favorites.update({
      where: {
        id: USER_ID,
      },
      data: {
        [key]: {
          connect: {
            id,
          },
        },
      },
    });
  }

  async deleteItem(id: string, key: string) {
    await this.db.favorites.update({
      where: {
        id: USER_ID,
      },
      data: {
        [key]: {
          disconnect: {
            id,
          },
        },
      },
    });
    return id;
  }

  async getDbInstance(id: string, src: string) {
    const table = this.db[src];
    const instance = await table.findUnique({
      where: {
        id: id,
      },
    });
    return instance;
  }

  async isFavorite(id: string, key: string) {
    const fav = await this.db.favorites.findMany({
      where: { id: USER_ID },
      include: {
        [key]: {
          where: {
            id,
          },
        },
      },
    });
    return !!fav;
  }
}
