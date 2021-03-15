import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { MIN_LONG, MAX_LONG } from './custom-validators.constants';

@ValidatorConstraint({ name: 'isLatitude', async: false })
export class IsLongitude implements ValidatorConstraintInterface {
  validate(longitude: number) {
    return longitude >= MIN_LONG && longitude <= MAX_LONG;
  }

  defaultMessage() {
    return 'The longitude must be between -180 and 180';
  }
}
