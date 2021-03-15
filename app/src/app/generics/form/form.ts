import { FormGroup } from '@angular/forms';

export class Form {
  public form: FormGroup;

  constructor(childForm: FormGroup) {
    this.form = childForm;
  }

  public resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.form.reset();
    this.form.markAsPristine();
    this.form.updateValueAndValidity();
  }

  public validateForm(): void {
    this.form.markAsDirty();
    this.form.updateValueAndValidity();
  }
}
