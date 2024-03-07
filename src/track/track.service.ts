import { Injectable } from '@nestjs/common';
import { TrackDto } from './track.dto';
import { TemplateService } from 'src/template/template.service';
import { db } from 'src/db/db';

@Injectable()
export class TrackService extends TemplateService<TrackDto> {
  constructor() {
    super(db.tracks);
  }

  removeFromFavs(id: string) {
    const items = db.favorites.tracks;
    if (items.has(id)) {
      items.delete(id);
    }
  }
}
