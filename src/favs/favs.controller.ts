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
import { Favorites } from '@prisma/client';

@Controller('favs')
export class FavsController {
  constructor(private service: FavsService) {}

  @Get()
  async getAll() {
    return await this.service.getAll();
  }

  @Post(':source/:id')
  async addToFavorite(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('source') src: keyof Favorites,
  ) {
    const key = src + 's';
    const item = await this.service.getDbInstance(id, src);

    if (!item) throw new UnprocessableEntityException('Entity does not exist');
    return await this.service.addItem(id, key);
  }

  @HttpCode(204)
  @Delete(':source/:id')
  async removeFromFavorite(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('source') src: keyof Favorites,
  ) {
    const key = src + 's';
    if (!(await this.service.isFavorite(id, key)))
      throw new NotFoundException(`This item is not favorite.`);

    await this.service.deleteItem(id, key);
  }
}
