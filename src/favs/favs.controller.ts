import {
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { DBFavorites } from 'src/db/db';

@Controller('favs')
export class FavsController {
  constructor(private service: FavsService) {}

  @Get()
  async getAll() {
    return this.service.getAll();
  }

  @Post(':source/:id')
  addToFavorite(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('source') src: keyof DBFavorites,
  ) {
    const key = src + 's';
    const item = this.service.getDbInstance(id, key);

    if (!item) throw new UnprocessableEntityException('Entity does not exist');
    return this.service.addItem(id, key);
  }

  @HttpCode(204)
  @Delete(':source/:id')
  removeFromFAvorite(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('source') src: keyof DBFavorites,
  ) {
    const key = src + 's';

    if (!this.service.isFavorite(id, key))
      throw new NotFoundException(`This item is not favorite.`);

    this.service.deleteItem(id, key);
  }
}
