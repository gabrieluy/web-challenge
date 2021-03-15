import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';

export default class DataMapper {
  private static readonly OPTIONS = {
    excludeExtraneousValues: false,
  };

  forceCast<T>(obj: unknown, forceTo: T): T {
    Object.keys(obj).forEach((key) => {
      forceTo[key] = obj[key];
    });
    return forceTo;
  }

  mapObjectToDto<T>(obj: unknown, dtoClass: ClassType<T>): T {
    return plainToClass(dtoClass, obj, DataMapper.OPTIONS);
  }

  mapArrayToDto<T>(array: unknown[], dtoClass: ClassType<T>): T[] {
    return plainToClass(dtoClass, array, DataMapper.OPTIONS);
  }
}
