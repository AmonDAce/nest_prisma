import { Controller, Get, Post, Body, HttpCode, Param } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { connect } from 'http2';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createPostDto: CreatePostDto) {

    console.log(createPostDto);

    return await this.postService.createPost(createPostDto);
  }

  @Get()
  async findAll() {
    return await this.postService.findManyPostFromAuthor();
  }
}