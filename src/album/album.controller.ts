import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import {
  CreateAlbumDto as C,
  UpdateAlbumDto as U,
  AlbumDto as T,
} from './album.dto';

@Controller('album')
export class AlbumController {
  constructor(private service: AlbumService) {}

  // TODO: DRY ->
  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string) {
    const item = this.service.getById(id);
    if (!item) throw new NotFoundException(`Not found.`);
    return item;
  }

  @HttpCode(201)
  @Post()
  create(@Body(ValidationPipe) dto: C) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body(ValidationPipe) dto: U) {
    const item = this.service.getById(id);
    if (!item) throw new NotFoundException(`Not found.`);

    return this.service.update(id, dto);
  }

  @HttpCode(204)
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    const item = this.service.getById(id);
    if (!item) throw new NotFoundException(`Not found.`);
    //replace artistId with NULL
    // this.service.removeAlbumId(id);
    // this.service.removeFromFavs(id);
    this.service.delete(id);
  }
}
