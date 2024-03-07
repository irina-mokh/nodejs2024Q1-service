import { Injectable } from '@nestjs/common';
import { ArtistDto } from './artist.dto';
import { TemplateService } from 'src/template/template.service';
import { db } from 'src/db/db';

@Injectable()
export class ArtistService extends TemplateService<ArtistDto> {
  constructor() {
    super(db.artists);
  }

  removeArtistId(id: string) {
    db.albums.forEach((album) => {
      if (album.artistId === id) album.artistId = null;
    });

    db.tracks.forEach((track) => {
      if (track.artistId === id) track.artistId = null;
    });
  }

  removeFromFavs(id: string) {
    const items = db.favorites.artists;
    if (items.has(id)) {
      items.delete(id);
    }
  }
}
