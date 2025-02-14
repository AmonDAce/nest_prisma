import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaDatabaseModule } from 'src/prisma-database/prisma.module';
import { AuthorModule } from 'src/author/author.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [PrismaDatabaseModule, AuthorModule, CategoryModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
