import { db } from 'src/db/db';
import { ItemsUnion } from 'src/template/template.dto';

const { favorites } = db;

export class FavsService {
  db = db;
  items = favorites;

  getAll = () => ({
    tracks: [...Array.from(this.items.tracks.values())],
    albums: [...Array.from(this.items.albums.values())],
    artists: [...Array.from(this.items.artists.values())],
  });

  addItem(id: string, key: string) {
    const item = this.getDbInstance(id, key);
    favorites[key].set(id, item);
    return item;
  }

  deleteItem(id: string, key: string) {
    favorites[key].delete(id);
  }

  isFavorite(id: string, key: string) {
    return favorites[key].has(id);
  }

  getDbInstance(id: string, key: string) {
    return this.db[key].find((item: ItemsUnion) => item.id === id);
  }
}
