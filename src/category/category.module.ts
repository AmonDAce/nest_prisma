import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaDatabaseModule } from 'src/prisma-database/prisma.module';

@Module({
  imports: [PrismaDatabaseModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
