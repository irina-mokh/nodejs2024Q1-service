import { Injectable } from '@nestjs/common';
import { CreateAlbumDto as C, UpdateAlbumDto as U } from './album.dto';
import { Album as T } from '@prisma/client';
import { DBService } from 'src/db/db.service';
import { CRUDService } from 'src/crud/crud.service';

@Injectable()
export class AlbumService extends CRUDService<T, C, U> {
  constructor(db: DBService) {
    super(db, 'album');
  }
}
