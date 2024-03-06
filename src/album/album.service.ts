import { Injectable } from '@nestjs/common';
import { TemplateService } from 'src/template/template.service';
import { db } from 'src/db/db';
import { AlbumDto } from './album.dto';

const { albums, tracks } = db;
@Injectable()
export class AlbumService extends TemplateService<AlbumDto> {
  constructor() {
    super(albums);
  }

  removeAlbumId(id: string) {
    tracks.forEach((track) => {
      if (track.albumId === id) track.albumId = null;
    });
  }
}
