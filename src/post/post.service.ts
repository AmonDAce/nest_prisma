import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PrismaService } from 'src/prisma-database/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(post: CreatePostDto) {

  const author = await this.prismaService.author.findUnique({
    where: {
      id: post.authorId,
    }
  });

  if (!author) {
    throw new NotFoundException('Autor não encontrado');
  }

  console.log(author);


  return await this.prismaService.post.create({
    data: {
      title: post.title,
      content: post.content,
      authorId: author.id,
    }
  });
}
    

  //   const authorExists = await this.prismaService.author.findUnique({
  //     where: { id: this.prismaService.author.id },
  //   });
  //   if (!authorExists) {
  //     throw new NotFoundException('Autor não encontrado');
  //   }

  //   if (post.Categories) {
  //     const categoriesExists = await this.prismaService.category.findMany({
  //       where: {
  //         name: {
  //           in: post.Categories,
  //         },
  //       },
  //     });
  //     if (categoriesExists.length !== post.Categories.length) {
  //       throw new NotFoundException('Categoria não encontrada');
  //     }
  //   }
  //   return await this.prismaService.post.create({
  //     data: {
  //       title: post.title,
  //       content: post.content,
  //       author: {
  //         connect: { id: post.authorId },
  //       },
  //       postCategories: post.Categories
  //         ? {
  //             create: post.Categories.map((category) => ({
  //               categoryId: category,
  //             })),
  //           }
  //         : undefined,
  //     },
  //   });
  // }

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
