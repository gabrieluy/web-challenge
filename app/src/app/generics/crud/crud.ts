import { Form } from '../form/form';
import { FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

export class Crud extends Form {
  header = 'Post';
  isEditMode  = false;
  elementName = 'Post';

  constructor(form: FormGroup,
              private nzMessageService: NzMessageService,
              private router: Router) {
    super(form);
  }

  init(id: any, elementName: string) {
    this.elementName = elementName;
    this.setHeader(id);
  }

  setHeader(id: any) {
    this.isEditMode = !!id;
    this.header = !this.isEditMode ? `Create ${this.elementName}` : `Edit ${this.elementName}`;
  }

  afterEditOrCreate() {
    this.nzMessageService.info(`${this.elementName} ${this.isEditMode ? 'edited' : 'created'}`);
    this.router.navigate([`/${this.elementName}s`]).then();
  }

  loadForm(data: any) {
    Object.keys(data).forEach(key => {
      if (this.form.controls[key]) {
        this.form.controls[key].setValue(data[key]);
      }
    });
  }

  isFormValid(): boolean {
    return this.form.valid;
  }
}
