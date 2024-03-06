import { IsUUID } from 'class-validator';

export class AlbumDto {
  @IsUUID()
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}
