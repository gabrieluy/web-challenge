import { createConnection } from 'typeorm';
import { DATABASE_CONNECTION } from '../constants/constants';
import { Post } from '../entities/post.entity';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async () =>
      await createConnection({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [Post],
        synchronize: true,
      }),
  },
];
