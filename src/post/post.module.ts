import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaDatabaseModule } from 'src/prisma-database/prisma.module';
import { AuthorModule } from 'src/author/author.module';

@Module({
  imports: [PrismaDatabaseModule, AuthorModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
