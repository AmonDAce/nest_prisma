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
        id: { in: post.categories },
      },
    });

    const foundCategoryIds = categoriesExists.map(category => category.id);

    const allCategoriesExist = post.categories.every(id => foundCategoryIds.includes(id));

    if (!allCategoriesExist) {
      throw new NotFoundException('Uma ou mais categorias não foram encontradas');
    }

    console.log("AUTOR", authorExists.id);
    const criarPost = await this.prismaService.post.create({
      data: {
        title: post.title,
        content: post.content,
        author: {
          connect: {
            id: authorExists.id
          }
        } ,
        postCategories: {
          create: categoriesExists.map(category => {
            return {
              categoryId: category.id
            }
          })
        }
      }, include: {
        author: true,
      }
    })

    return criarPost;
  }

  async findPostById(id: string) {
    return await this.prismaService.post.findUnique({
        where: {
            id
        },
    });
  }

  async findManyPostFromAuthor() {
    const posts = await this.prismaService.post.findMany({
      include: {
        postCategories: {
          select: {
            category: {
              select: {
                name: true
              }
            },
          },
        },
      },
    });

    return posts.map(post => ({
      ...post,
      postCategories: post.postCategories.map(pc => pc.category.name),
    }));
  }

  async deletePost(id: string) {
    
    const locatePost = await this.findPostById(id);

    if(!locatePost) {
        throw new NotFoundException('Post não encontrado');
    }

    const postId = locatePost.id;

    await this.prismaService.postCategory.deleteMany({
      where: {
        postId: postId
      },
    });
  
    return await this.prismaService.post.delete({
      where: { id: postId }
    })

  }
}
