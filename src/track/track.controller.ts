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
import { CreateTrackDto, PartialTrackDto, TrackDto } from './track.dto';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  async getAll(): Promise<TrackDto[]> {
    return this.trackService.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string): Promise<TrackDto> {
    const track = this.trackService.getById(id);
    if (!track) throw new NotFoundException('Track is not found.');
    return track;
  }

  @HttpCode(201)
  @Post()
  createTrack(@Body(ValidationPipe) dto: CreateTrackDto) {
    return this.trackService.createTrack(dto);
  }

  @Put(':id')
  async updatePass(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) dto: PartialTrackDto,
  ) {
    const track = this.trackService.getById(id);
    if (!track) throw new NotFoundException('Track is not found.');

    return this.trackService.update(id, dto);
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const track = this.trackService.getById(id);
    if (!track) throw new NotFoundException('Track is not found.');
    this.trackService.delete(id);
  }
}
