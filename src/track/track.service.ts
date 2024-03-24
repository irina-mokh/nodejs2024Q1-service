import { Injectable } from '@nestjs/common';
import { CreateTrackDto as C, UpdateTrackDto as U } from './track.dto';
import { DBService } from 'src/db/db.service';
import { CRUDService } from 'src/crud/crud.service';
import { Track as T } from '@prisma/client';

@Injectable()
export class TrackService extends CRUDService<T, C, U> {
  constructor(db: DBService) {
    super(db, 'track');
  }
}
