import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from 'src/prisma-database/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(category: CreateCategoryDto) {
    const { names } = category as any;

    const dataNames = names.map((name: string) => {
      return {
        name
      };
    });

    return await this.prismaService.category.createMany({
      data: dataNames
    });
  }
}
