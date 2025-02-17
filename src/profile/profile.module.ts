import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { PrismaDatabaseModule } from 'src/prisma-database/prisma.module';
import { AuthorModule } from 'src/author/author.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [PrismaDatabaseModule, AuthorModule, CategoryModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
