import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';

export class ArtistDto {
  @IsUUID()
  id: string; // uuid v4

  @IsNotEmpty()
  name: string;

  @IsBoolean()
  grammy: boolean;
}

export class CreateArtistDto extends OmitType(ArtistDto, ['id'] as const) {}

export class UpdateArtistDto extends PartialType(ArtistDto) {}
