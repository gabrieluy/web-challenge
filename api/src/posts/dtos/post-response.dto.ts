import { ApiProperty } from '@nestjs/swagger';

export class PostResponseDto {
  @ApiProperty({
    description: 'The id of the post',
  })
  readonly id: string;

  @ApiProperty({
    description: 'The title of the Post',
  })
  readonly title: string;

  @ApiProperty({
    description: 'The the content of the post',
  })
  readonly content: string;

  @ApiProperty({
    description: 'The latitude of the Post',
  })
  readonly lat: number;

  @ApiProperty({
    description: 'The longitude of the Post',
  })
  readonly long: number;

  @ApiProperty({
    description: 'The image_url of the Post',
  })
  readonly image_url: string;
}
