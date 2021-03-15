import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { MIN_LAT, MAX_LAT } from './custom-validators.constants';

@ValidatorConstraint({ name: 'isLatitude', async: false })
export class IsLatitude implements ValidatorConstraintInterface {
  validate(latitude: number) {
    return latitude >= MIN_LAT && latitude <= MAX_LAT;
  }

  defaultMessage() {
    return 'The latitude must be between -90 and 90';
  }
}
