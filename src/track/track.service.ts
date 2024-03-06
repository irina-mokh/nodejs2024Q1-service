import { Injectable } from '@nestjs/common';
import { CreateTrackDto, PartialTrackDto, TrackDto } from './track.dto';
import { v4 as uuid } from 'uuid';
import { TemplateService } from 'src/template/template.service';

@Injectable()
export class TrackService extends TemplateService<TrackDto> {
  constructor() {
    super();
  }

  createTrack(dto: CreateTrackDto) {
    const track: TrackDto = {
      id: uuid(),
      ...dto,
    };

    this.items.push(track);
    return track;
  }

  update(id: string, dto: PartialTrackDto) {
    const track: TrackDto = this.getById(id);

    const updatedTrack = { ...track, ...dto };
    return updatedTrack;
  }
}
