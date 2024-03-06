import { Injectable } from '@nestjs/common';
import { ArtistDto } from './artist.dto';
import { TemplateService } from 'src/template/template.service';
import { db } from 'src/db/db';

const { artists, albums, tracks } = db;
@Injectable()
export class ArtistService extends TemplateService<ArtistDto> {
  constructor() {
    super(artists);
  }

  removeArtistId(id: string) {
    albums.forEach((album) => {
      if (album.artistId === id) album.artistId = null;
    });

    tracks.forEach((track) => {
      if (track.artistId === id) track.artistId = null;
    });
  }
}
