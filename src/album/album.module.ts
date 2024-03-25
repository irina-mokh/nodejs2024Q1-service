import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { DBModule } from 'src/db/db.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [DBModule],
})
export class AlbumModule {}
