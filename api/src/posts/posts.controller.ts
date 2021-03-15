import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  HttpCode,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import DataMapper from '../common/transformers/data-mapper';
import { PostResponseDto } from './dtos/post-response.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { ErrorsInterceptor } from '../common/errors/errors.interceptor';

@UseInterceptors(new ErrorsInterceptor())
@ApiBearerAuth()
@Controller('posts')
export class PostsController {
  constructor(
    private readonly service: PostsService,
    private readonly mapper: DataMapper,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'All the posts',
    type: PostResponseDto,
    isArray: true,
  })
  async getMany(): Promise<PostResponseDto[]> {
    const posts = await this.service.getMany();
    return this.mapper.mapArrayToDto<PostResponseDto>(posts, PostResponseDto);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'One post', type: PostResponseDto })
  async getOne(@Param('id') id: string): Promise<PostResponseDto> {
    const post = await this.service.getOne(id);
    return this.mapper.mapObjectToDto<PostResponseDto>(post, PostResponseDto);
  }

  @Post()
  async createOne(
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostResponseDto> {
    const post = await this.service.createOne(createPostDto);
    return this.mapper.mapObjectToDto<PostResponseDto>(post, PostResponseDto);
  }

  @Put()
  async updateOne(
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostResponseDto> {
    const post = await this.service.updateOne(updatePostDto);
    return this.mapper.mapObjectToDto<PostResponseDto>(post, PostResponseDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteOne(@Param('id') id: string): Promise<void> {
    return this.service.deleteOne(id);
  }
}
