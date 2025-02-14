import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-database/prisma.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorService {
    constructor(private readonly prismaService: PrismaService) {}

    async findAuthorByEmail(email: string) {
        return await this.prismaService.author.findUnique({
            where: {
                email
            },
        });
    }

    async findAuthorById(id: number) {
        return await this.prismaService.author.findUnique({
            where: {
                id
            },
        });
    }

    async findManyAuthor() {
        return await this.prismaService.author.findMany({
            include: {
                profile: true,
                posts: true,
            }
        });
    }

    async createAuthor(author: CreateAuthorDto) {

        const profile = !author.profileDescription ? undefined : {
            description: author.profileDescription
        };

        return await this.prismaService.author.create({
            data: { 
                ...author,
                profile: {
                    create: profile
                }}
        });
    }

    async createProfile (id: number, profileDescription: string) {
        
        const author = await this.prismaService.author.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!author) {
            throw new NotFoundException('Autor não encontrado');
        }

        const profile = await this.prismaService.profile.create({
            data: {
                description: profileDescription,
                author: {
                    connect: {
                        id: author.id
                    }
                }
            }
        })

        return profile;
    }

    async updateAuthor(id: number, author: UpdateAuthorDto) {
        return await this.prismaService.author.update({
            where: {
                id
            },
            data: author
        });
    }

    async deleteAuthor(id: number) {
        return await this.prismaService.author.delete({
            where: {
                id
            },
        });
    }
}