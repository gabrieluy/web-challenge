import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { IsLatitude } from '../../common/custom-validators/is-latitude';
import { IsLongitude } from '../../common/custom-validators/is-longitude';

export class CreatePostDto {
  @ApiProperty({
    example: 'Madrid',
    description: 'The title of the Post',
  })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    description: 'The the content of the post',
  })
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty({
    example: -34.9213569,
    description: 'The latitude of the Post',
  })
  @Validate(IsLatitude)
  @IsNotEmpty()
  readonly lat: number;

  @ApiProperty({
    example: -56.1477084,
    description: 'The longitude of the Post',
  })
  @Validate(IsLongitude)
  @IsNotEmpty()
  readonly long: number;

  @ApiProperty({
    example: 'https://c2.staticflickr.com/2/1269/4670777817_d657cd9819_b.jpg',
    description: 'The image_url of the Post',
  })
  @IsNotEmpty()
  readonly image_url: string;
}
