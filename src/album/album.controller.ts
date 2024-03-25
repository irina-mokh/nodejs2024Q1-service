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
import { CreateAlbumDto as C, UpdateAlbumDto as U } from './album.dto';

@Controller('album')
export class AlbumController {
  constructor(private service: AlbumService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    const item = await this.service.getById(id);
    if (!item) throw new NotFoundException(`Not found.`);
    return item;
  }

  @HttpCode(201)
  @Post()
  create(@Body(ValidationPipe) dto: C) {
    return this.service.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) dto: U,
  ) {
    const item = await this.service.getById(id);
    if (!item) throw new NotFoundException(`Not found.`);

    return this.service.update(id, dto);
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const item = await this.service.getById(id);
    if (!item) throw new NotFoundException(`Not found.`);

    await this.service.delete(id);
  }
}
