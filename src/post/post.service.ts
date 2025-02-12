import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PrismaService } from 'src/prisma-database/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(post: CreatePostDto, authorId: number) {
    if (!authorId) {
      throw new NotFoundException('Autor não encontrado');
    }

    if (post.postCategory) {
      const categoriesExists = await this.prismaService.category.findMany({
        where: {
          name: {
            in: post.postCategory,
          },
        },
      });
      if (categoriesExists.length !== post.postCategory.length) {
        throw new NotFoundException('Categoria não encontrada');
      }
    }
    return await this.prismaService.post.create({
      data: {
        title: post.title,
        content: post.content,
        author: {
          connect: { id: authorId },
        },
        postCategories: post.postCategory
          ? {
              create: post.postCategory.map((category) => ({
                categoryId: category,
              })),
            }
          : undefined,
      },
    });
  }

  async findManyPost() {
    return await this.prismaService.post.findMany({
      include: {
        postCategories: {
          include: {
            category: true,
          },
        },
      },
    });
  }
}
