import { DBService } from 'src/db/db.service';

export class FavsService {
  constructor(readonly db: DBService) {}

  async getAll() {
    return this.db.favorites.findMany();
  }

  async addItem(id: string, key: string) {
    const item = await this.getDbInstance(id, key);
    this.db.favorites[key].create({
      data: { item },
    });
    return item;
  }

  deleteItem(id: string, key: string) {
    this.db.favorites[key].delete(id);
  }

  isFavorite(id: string, key: string) {
    return Boolean(this.getDbInstance(id, key));
  }

  async getDbInstance(id: string, key: string) {
    return this.db.favorites[key].findUnique({ where: { id } });
  }
}
