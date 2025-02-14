import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PrismaService } from 'src/prisma-database/prisma.service';

@Injectable()
export class PostService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  async createPost(post: CreatePostDto) {

    const authorExists = await this.prismaService.author.findUnique({
      where: {
        id: Number(post.authorId)
      }
    })

    if (!authorExists) {
      throw new NotFoundException('Autor não encontrado');
    }

    const categoriesExists = await this.prismaService.category.findMany({
      where: {
        id: { in: post.categories }
      }
    })

    if (post.categories.length !== categoriesExists.length) {
      throw new NotFoundException('Categorias não encontrada');
    }

    const criarPost = await this.prismaService.post.create({
      data: {
        title: post.title,
        content: post.content,
        authorId: authorExists.id,
        postCategories: {
          create: categoriesExists.map(category => {
            return {
              categoryId: category.id
            }
          })
        }
      }
    })

    return await this.prismaService.post.create({
      data: { 
        ...criarPost,
      },
    });
  }

  async findManyPostFromAuthor() {
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
