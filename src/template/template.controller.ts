// import {
//   Body,
//   Delete,
//   Get,
//   HttpCode,
//   NotFoundException,
//   Param,
//   ParseUUIDPipe,
//   Post,
//   Put,
//   ValidationPipe,
// } from '@nestjs/common';
// import { ItemDto } from './template.dto';
// import { TemplateService } from './template.service';

// export class TemplateController<T extends ItemDto, C, U> {
//   constructor(protected service: TemplateService<T>) {}

//   @Get()
//   async getAll(): Promise<T[]> {
//     return this.service.getAll();
//   }

//   @Get(':id')
//   async getById(@Param('id', ParseUUIDPipe) id: string): Promise<T> {
//     const item = this.service.getById(id);
//     if (!item) throw new NotFoundException(`Not found.`);
//     return item;
//   }

//   @HttpCode(201)
//   @Post()
//   create(@Body(ValidationPipe) dto: C) {
//     return this.service.create(dto);
//   }

//   @Put(':id')
//   async update(
//     @Param('id', ParseUUIDPipe) id: string,
//     @Body(ValidationPipe) dto: U,
//   ) {
//     const item = this.service.getById(id);
//     if (!item) throw new NotFoundException(`Not found.`);

//     return this.service.update(id, dto);
//   }

//   @HttpCode(204)
//   @Delete(':id')
//   async delete(@Param('id', ParseUUIDPipe) id: string) {
//     const artist = this.service.getById(id);
//     if (!artist) throw new NotFoundException(`Not found.`);
//     this.service.delete(id);
//   }
// }
