import { Injectable } from '@nestjs/common';
import { CreateAlbumDto as C, UpdateAlbumDto as U } from './album.dto';
import { DBService } from 'src/db/db.service';

@Injectable()
export class AlbumService {
  constructor(readonly db: DBService) {}

  async getAll() {
    return await this.db.album.findMany();
  }

  async getById(id: string) {
    return this.db.album.findUnique({
      where: { id },
    });
  }

  async create(dto: C) {
    return await this.db.album.create({
      data: dto,
    });
  }

  async update(id: string, dto: U) {
    const updItem = await this.db.album.update({
      where: { id },
      data: dto,
    });

    return updItem;
  }

  async delete(id: string) {
    await this.db.album.delete({ where: { id } });
  }
}
