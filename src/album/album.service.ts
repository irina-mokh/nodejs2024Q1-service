import { Injectable } from '@nestjs/common';
import { TemplateService } from 'src/template/template.service';
import { db } from 'src/db/db';
import { AlbumDto } from './album.dto';

@Injectable()
export class AlbumService extends TemplateService<AlbumDto> {
  constructor() {
    super(db.albums);
  }

  removeAlbumId(id: string) {
    db.tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });
  }

  removeFromFavs(id: string) {
    const items = db.favorites.albums;
    if (items.has(id)) {
      items.delete(id);
    }
  }
}
