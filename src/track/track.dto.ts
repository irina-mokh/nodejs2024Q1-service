import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty, IsUUID } from 'class-validator';

export class TrackDto {
  @IsUUID()
  id: string; // uuid v4

  @IsNotEmpty()
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album

  @IsInt()
  duration: number; // integer number
}

export class UpdateTrackDto extends PartialType(TrackDto) {}

export class CreateTrackDto extends OmitType(TrackDto, ['id'] as const) {}
