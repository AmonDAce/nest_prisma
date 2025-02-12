import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) {}
    
    @Post()
    @HttpCode(201)
    async create(@Body() author: CreateAuthorDto) {
        const emailExists =  await this.authorService.findAuthorByEmail(author.email);

        if(emailExists) {
            throw new BadRequestException('O email informado já está em uso');
        }

        return await this.authorService.createAuthor(author);
    }

    @Get()
    @HttpCode(200)
    async findAll() {
        return await this.authorService.findManyAuthor();
    }

    @Get(':id')
    @HttpCode(200)
    async show(@Param('id') id: string) {
        const author = await this.authorService.findAuthorById(Number(id));

        if(!author) {
            throw new NotFoundException('Autor não encontrado');
        }

        return author;
    }

    @Delete(':id')
    @HttpCode(200)
    async delete(@Param('id') id: string) {
        const author = await this.authorService.findAuthorById(Number(id));

        if(!author) {
            throw new NotFoundException('Autor não encontrado');
        }

        return this.authorService.deleteAuthor(Number(id));
    }

    @Patch(':id')
    @HttpCode(200)
    async patch(@Param('id') id: string, @Body() author: UpdateAuthorDto) {
        const authorExists = await this.authorService.findAuthorById(Number(id));
        
        if(!authorExists) {
            throw new NotFoundException('Autor não encontrado');
        }

        return await this.authorService.updateAuthor(Number(id), author);
    }
}
