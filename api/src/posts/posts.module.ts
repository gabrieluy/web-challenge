import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsProviders } from './posts.provider';
import { DatabaseModule } from '../database/database.module';
import DataMapper from '../common/transformers/data-mapper';

@Module({
  imports: [DatabaseModule],
  controllers: [PostsController],
  providers: [PostsService, DataMapper, ...PostsProviders],
})
export class PostsModule {}
