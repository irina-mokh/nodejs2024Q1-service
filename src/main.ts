import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const apiFile = readFileSync(join(__dirname, '../doc/api.yaml'), 'utf8');

  SwaggerModule.setup('doc', app, parse(apiFile));

  await app.listen(4000);
}
bootstrap();
