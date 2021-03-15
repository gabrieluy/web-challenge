import { PostsService } from '../posts.service';
import { Test, TestingModule } from '@nestjs/testing';
import DataMapper from '../../common/transformers/data-mapper';
import { REPOSITORIES } from '../../constants/constants';
import { NotFoundException } from '@nestjs/common';

describe('Posts Service', () => {
  let service: PostsService;
  const post = {
    id: 'validId',
    title: 'Madrid2',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    lat: -34.9213569,
    long: -56.1477084,
    image_url: 'https://c2.staticflickr.com/2/1269/4670777817_d657cd9819_b.jpg',
  };
  const postsRepository = {
    find: () => [post],
    findOne: (args) => {
      if (args.id === 'validId') {
        return post;
      }
    },
    save: (postDto) => {
      return { id: 'some-cool-id', ...postDto };
    },
    remove: () => undefined,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        DataMapper,
        {
          provide: REPOSITORIES.POST,
          useValue: postsRepository,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  describe('getMany', () => {
    it('returns a post when the id is known', async () => {
      const retrievedPost = await service.getMany();
      expect(retrievedPost).toEqual([
        {
          id: 'validId',
          title: 'Madrid2',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          lat: -34.9213569,
          long: -56.1477084,
          image_url:
            'https://c2.staticflickr.com/2/1269/4670777817_d657cd9819_b.jpg',
        },
      ]);
    });
  });

  describe('getOne', () => {
    it('returns a post when the id is known', async () => {
      const retrievedPost = await service.getOne('validId');
      expect(retrievedPost).toEqual(post);
    });

    it('throws an error when the id is unknown', async () => {
      try {
        await service.getOne('unknownId');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('createOne', () => {
    const { id, ...validParameters } = post;

    it('creates the post when the attributes are valid', async () => {
      const createdPost = await service.createOne(validParameters);
      expect(createdPost).toEqual({
        id: 'some-cool-id',
        title: 'Madrid2',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        lat: -34.9213569,
        long: -56.1477084,
        image_url:
          'https://c2.staticflickr.com/2/1269/4670777817_d657cd9819_b.jpg',
      });
    });
  });

  describe('updateOne', () => {
    const validParameters = post;

    it('updates the post when the attributes are valid', async () => {
      const createdPost = await service.updateOne(validParameters);
      expect(createdPost).toEqual({
        id: 'validId',
        title: 'Madrid2',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        lat: -34.9213569,
        long: -56.1477084,
        image_url:
          'https://c2.staticflickr.com/2/1269/4670777817_d657cd9819_b.jpg',
      });
    });

    const invalidParameters = {
      id: null,
      title: null,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      lat: -56.1477084,
      long: -56.1477084,
      image_url:
        'https://c2.staticflickr.com/2/1269/4670777817_d657cd9819_b.jpg',
    };

    it('throws an error when the post is invalid', async () => {
      try {
        await service.updateOne(invalidParameters);
        throw new Error('No exception');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes the post when the id is known', async () => {
      spyOn(postsRepository, 'remove');

      await service.deleteOne('validId');

      expect(postsRepository.remove).toHaveBeenCalled();
    });

    it('throws an error when the id is unknown', async () => {
      try {
        await service.deleteOne('unknownId');
        throw new Error('No exception');
      } catch (error) {
        expect(error.message).toBe('Post not found');
      }
    });
  });
});
