import { Module } from '@nestjs/common';
import { AuthorModule } from './author/author.module';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { ProfileModule } from './profile/profile.module';
import { AuthorController } from './author/author.controller';

@Module({
  imports: [AuthorModule, PostModule, CategoryModule, ProfileModule],
  controllers: [AuthorController],
  providers: [],
})
export class AppModule {}
