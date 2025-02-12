import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaDatabaseModule } from 'src/prisma-database/prisma.module';

@Module({
  imports: [PrismaDatabaseModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
