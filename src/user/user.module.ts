import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DBModule } from 'src/db/db.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [DBModule],
})
export class UserModule {}
