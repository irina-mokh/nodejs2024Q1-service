import { Injectable } from '@nestjs/common';
import { TrackDto } from './track.dto';
import { TemplateService } from 'src/template/template.service';
import { db } from 'src/db/db';

const { tracks } = db;

@Injectable()
export class TrackService extends TemplateService<TrackDto> {
  constructor() {
    super(tracks);
  }
}
