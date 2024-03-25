import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { DBModule } from 'src/db/db.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [DBModule],
})
export class ArtistModule {}
