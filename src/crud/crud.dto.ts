import { PartialType, OmitType } from '@nestjs/mapped-types';
import { IsUUID } from 'class-validator';
import { AlbumDto } from 'src/album/album.dto';
import { ArtistDto } from 'src/artist/artist.dto';
import { TrackDto } from 'src/track/track.dto';
import { UserDto } from 'src/user/user.dto';

export type ItemsUnion = UserDto | ArtistDto | TrackDto | AlbumDto;

export class ItemDto {
  @IsUUID()
  id: string;
}

export class PartialDto extends PartialType(ItemDto) {}

export class CreateDto extends OmitType(ItemDto, ['id'] as const) {}
