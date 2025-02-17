import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { PrismaService } from 'src/prisma-database/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  async createProfile (profileDescription: CreateProfileDto) {
          
    const findAuthor = await this.prismaService.author.findUnique({
      where: {
        id: Number(profileDescription.authorId)
      }
    });
  
    if (!findAuthor) {
      throw new NotFoundException('Autor não encontrado');  
    }
    
    if (profileDescription.description !== null) {
      return `Descrição de perfil já existe!`
    }

    const profile = await this.prismaService.profile.create({
      data: {
        description: profileDescription.description,
        author: {
          connect: {
            id: findAuthor.id
          }
        }
      }
    })
  
    return profile;
  }

  async updateAuthorProfile(id: number, profile: UpdateProfileDto) {
          
    const authorExists = await this.prismaService.author.findUnique({
      where: {
        id
      }
    })
        
    if (!authorExists) {
      throw new NotFoundException('Autor não encontrado');
    } 
  
    if(authorExists) {
      return await this.prismaService.profile.update({
        where: {
          authorId: authorExists.id
        },
        data: profile
      })
    }
  }

  async deleteProfile(id: string) {
    return await this.prismaService.profile.delete({
      where: {
        id
      }
    });
  }
}
