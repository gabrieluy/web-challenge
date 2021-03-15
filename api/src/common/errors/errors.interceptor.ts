import {
  CallHandler,
  ExecutionContext,
  HttpException,
  InternalServerErrorException,
  NestInterceptor,
  NotFoundException,
  UnprocessableEntityException,
  BadRequestException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  BAD_REQUEST,
  INVALID_RECORD,
  RESOURCE_NOT_FOUND,
} from './errors-codes.constants';

export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err.errorCode === INVALID_RECORD) {
          return throwError(new UnprocessableEntityException(err.errors));
        } else if (err.errorCode === RESOURCE_NOT_FOUND) {
          return throwError(new NotFoundException(err.errors));
        } else if (err.errorCode === BAD_REQUEST) {
          return throwError(new BadRequestException(err.errors));
        } else if (err instanceof HttpException) {
          throw err;
        } else {
          return throwError(new InternalServerErrorException());
        }
      }),
    );
  }
}
