import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AlbumDto {
  @IsUUID()
  id: string; // uuid v4

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  year: number;
  artistId: string | null; // refers to Artist
}

export class CreateAlbumDto extends OmitType(AlbumDto, ['id'] as const) {}

export class UpdateAlbumDto extends PartialType(AlbumDto) {}
