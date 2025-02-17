import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-database/prisma.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorService {
    constructor(
        private readonly prismaService: PrismaService,
    ) {}

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
            include: {
                profile: {
                    select: {
                        description: true
                    }
                },
                posts: {
                    select: {
                        title: true,
                        content: true
                    }
                },
                
            }
        });
    }

    async findManyAuthor() {
        return await this.prismaService.author.findMany({
            include: {
                profile: {
                    select: {
                        description: true
                    }
                },
                posts: {
                    select: {
                        title: true,
                        content: true
                    }
                },
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