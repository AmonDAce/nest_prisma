import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from 'src/prisma-database/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCategory(category: CreateCategoryDto) {

    const existingCategory = await this.prismaService.category.findUnique({
      where: {
        name: category.name,
      },
    });

    if (existingCategory) {
      return `A categoria ${category.name} já existe`;
    }

    return await this.prismaService.category.create({
      data: category,
    });
  }

  async findCategoryById(id: string) {
    return await this.prismaService.category.findUnique({
        where: {
            id
        },
    });
  }

  async getAllCategories() {
    return await this.prismaService.category.findMany();
  }

  async deleteCategory(id: string) {
    
    return await this.prismaService.category.delete({
      where: {
          id,
      },
  });
  }
}
