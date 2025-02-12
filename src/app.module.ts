import { Module } from '@nestjs/common';
import { AuthorModule } from './author/author.module';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [AuthorModule, PostModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
