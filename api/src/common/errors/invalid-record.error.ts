import { INVALID_RECORD } from './errors-codes.constants';

function mapClassValidatorErrors(errors) {
  return errors.reduce((retErrors, error) => {
    retErrors[error.property] = Object.values(error.constraints);
    return retErrors;
  }, {});
}

export class InvalidRecordError {
  readonly errorCode = INVALID_RECORD;
  readonly errors;

  constructor(error) {
    this.errors = mapClassValidatorErrors(error);
  }
}
