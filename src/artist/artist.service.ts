import { Injectable } from '@nestjs/common';
import {
  CreateArtistDto as C,
  UpdateArtistDto as U,
  // ArtistDto as T,
} from './artist.dto';
import { DBService } from 'src/db/db.service';
import { CRUDService } from 'src/crud/crud.service';
import { Artist as T } from '@prisma/client';

@Injectable()
export class ArtistService extends CRUDService<T, C, U> {
  constructor(db: DBService) {
    super(db, 'artist');
  }

  // async getAll() {
  //   return await this.db.artist.findMany();
  // }

  // async getById(id: string) {
  //   return this.db.artist.findUnique({
  //     where: { id },
  //   });
  // }

  // async create(dto: C) {
  //   return await this.db.artist.create({
  //     data: dto,
  //   });
  // }

  // async update(id: string, dto: U) {
  //   const updItem = await this.db.artist.update({
  //     where: { id },
  //     data: dto,
  //   });

  //   return updItem;
  // }

  // async delete(id: string) {
  //   await this.db.artist.delete({ where: { id } });
  // }
}
