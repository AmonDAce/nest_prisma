import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createPostDto: CreatePostDto) {

    console.log('authorId', createPostDto.authorId);
    
    return await this.postService.create(createPostDto);
  }

  @Get()
  async findAll() {
    return await this.postService.findManyPost();
  }
}
