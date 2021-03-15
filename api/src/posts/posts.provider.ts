import { Connection } from 'typeorm';
import { DATABASE_CONNECTION, REPOSITORIES } from '../constants/constants';
import { Post } from '../entities/post.entity';

export const PostsProviders = [
  {
    provide: REPOSITORIES.POST,
    useFactory: (connection: Connection) => connection.getRepository(Post),
    inject: [DATABASE_CONNECTION],
  },
];
