import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from '../posts.controller';
import { PostsService } from '../posts.service';
import DataMapper from '../../common/transformers/data-mapper';
import { PostResponseDto } from '../dtos/post-response.dto';

describe('Posts Controller', () => {
  let controller: PostsController;
  let service: PostsService;
  const examplePost = {
    id: 'validId',
    title: 'Madrid2',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    lat: -34.9213569,
    long: -56.1477084,
    image_url: 'https://c2.staticflickr.com/2/1269/4670777817_d657cd9819_b.jpg',
  };
  const postService = {
    getMany: () => [examplePost],
    getOne: (id) => {
      return { id: id, ...examplePost };
    },
    createOne: (post) => {
      return { title: post.title, ...examplePost };
    },
    updateOne: (post) => {
      return { title: post.title, ...examplePost };
    },
    deleteOne: (id) => id,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        DataMapper,
        {
          provide: PostsService,
          useValue: postService,
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  describe('getMany', () => {
    it('delegates to the service', async () => {
      jest.spyOn(service, 'getMany');

      await controller.getMany();

      expect(service.getMany).toHaveBeenCalled();
    });

    it('transforms the response', async () => {
      const posts = await controller.getMany();

      expect(posts[0]).toBeInstanceOf(PostResponseDto);
      expect((posts[0] as any).newRandomField).toBeUndefined();
    });
  });

  describe('getOne', () => {
    it('delegates to the service', async () => {
      jest.spyOn(service, 'getOne');

      await controller.getOne('id');

      expect(service.getOne).toHaveBeenCalled();
    });

    it('transforms the response', async () => {
      const post = await controller.getOne('id');

      expect(post).toBeInstanceOf(PostResponseDto);
      expect((post as any).newRandomField).toBeUndefined();
    });
  });

  describe('createOne', () => {
    it('delegates to the service', async () => {
      jest.spyOn(service, 'createOne');
      const post = { title: 'Post1', ...examplePost };
      await controller.createOne(post);

      expect(service.createOne).toHaveBeenCalled();
    });

    it('transforms the response', async () => {
      const post = { title: 'Post1', ...examplePost };
      const response = await controller.createOne(post);

      expect(response).toBeInstanceOf(PostResponseDto);
      expect((response as any).newRandomField).toBeUndefined();
    });
  });

  describe('updateOne', () => {
    it('delegates to the service', async () => {
      jest.spyOn(service, 'updateOne');
      const post = { id: '1', title: 'Post1', ...examplePost };
      await controller.updateOne(post);

      expect(service.updateOne).toHaveBeenCalled();
    });

    it('transforms the response', async () => {
      const post = { id: '1', title: 'Post1', ...examplePost };
      const response = await controller.updateOne(post);

      expect(response).toBeInstanceOf(PostResponseDto);
      expect((response as any).newRandomField).toBeUndefined();
    });
  });

  describe('deleteOne', () => {
    it('delegates to the service', async () => {
      jest.spyOn(service, 'deleteOne');
      const id = '1';
      await controller.deleteOne(id);

      expect(service.deleteOne).toHaveBeenCalled();
    });
  });
});
