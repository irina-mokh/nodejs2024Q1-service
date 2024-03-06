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
import { TrackService } from './track.service';
import {
  CreateTrackDto as C,
  UpdateTrackDto as U,
  TrackDto as T,
} from './track.dto';

@Controller('track')
export class TrackController {
  constructor(private service: TrackService) {}

  // TODO: DRY ->
  @Get()
  async getAll(): Promise<T[]> {
    return this.service.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string): Promise<T> {
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
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) dto: U,
  ) {
    const item = this.service.getById(id);
    if (!item) throw new NotFoundException(`Not found.`);

    return this.service.update(id, dto);
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const item = this.service.getById(id);
    if (!item) throw new NotFoundException(`Not found.`);
    this.service.delete(id);
  }
  // <- TODO: DRY
}
