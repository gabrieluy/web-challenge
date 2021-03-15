import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { Post } from '../entities/post.entity';
import { UpdatePostDto } from './dtos/update-post.dto';
import { REPOSITORIES } from '../constants/constants';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @Inject(REPOSITORIES.POST)
    private readonly repository: Repository<Post>,
  ) {}

  async getMany(): Promise<Post[]> {
    return this.repository.find();
  }

  async getOne(id: string): Promise<Post> {
    return this.find(id);
  }

  public async createOne(createPostDto: CreatePostDto): Promise<Post> {
    const post: Post = {
      title: createPostDto.title,
      content: createPostDto.content,
      lat: createPostDto.lat,
      long: createPostDto.long,
      image_url: createPostDto.image_url,
    };

    return this.repository.save(post);
  }

  public async updateOne(updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.find(updatePostDto.id);
    const updatedPost = { ...post, ...updatePostDto } as Post;
    return this.repository.save(updatedPost);
  }

  public async deleteOne(id: string): Promise<void> {
    const post = await this.find(id);
    await this.repository.remove(post);
  }

  private async find(id: string): Promise<Post> {
    const post = await this.repository.findOne({ id });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }
}
