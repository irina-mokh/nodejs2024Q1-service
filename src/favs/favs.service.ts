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

  async like(id: string, src: string) {
    await this.db[src].update({
      where: { id },
      data: {
        followers: {
          connect: { id: USER_ID },
        },
      },
    });
  }

  async unlike(id: string, src: string) {
    await this.db[src].update({
      where: { id },
      data: {
        followers: {
          disconnect: { id: USER_ID },
        },
      },
    });
  }

  async getDbInstance(id: string, src: string) {
    let instance = null;
    try {
      instance = await this.db[src].findUnique({
        where: {
          id: id,
        },
      });
    } catch (err) {
      console.log('getDBInstance err');
      console.log(err);
    }
    return instance;
  }

  async isFavorite(id: string, src: string) {
    let follower = null;
    try {
      follower = await this.db[src].findUnique({
        where: { id },
        include: {
          followers: {
            where: {
              id: USER_ID,
            },
          },
        },
      });
    } catch (err) {
      console.log('is Fav err');
      console.log(err);
    }

    return !!follower;
  }
}
