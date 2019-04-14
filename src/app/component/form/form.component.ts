import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FakeService } from './fake.service';
import * as _ from 'lodash';

const isBlank = value => _.isEmpty(_.trim(value));

export const mobileValidator = (control: AbstractControl) => {
  if (!isBlank(control.value) && !/^1\d{10}$/.test(control.value)) {
    return { message: '手机号码格式错误' };
  }
};

export const markAllFieldsAsTouched = (formGroup: FormGroup) => {
  _.keys(formGroup.controls).forEach(field => {
    formGroup.controls[field].markAsTouched();

    if (_.get(formGroup.controls[field], 'controls')) {
      markAllFieldsAsTouched(formGroup.controls[field] as FormGroup);
    }
  });
};

export const GENDER_OPTIONS = [
  { text: '男', value: 'Male' },
  { text: '女', value: 'Female' },
];

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  genderOptions = GENDER_OPTIONS;

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private fakeService: FakeService) {
    this.initForm();
  }

  ngOnInit() {
  }

  private initForm() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      gender: [null, Validators.required],
      mobile: [null, [Validators.required, mobileValidator]],
      address: null,
      comment: null,
      birthday: null,
    });
  }

  resetForm() {
    this.form.reset();
  }

  submit() {
    markAllFieldsAsTouched(this.form);
    if (this.form.valid) {
      this.fakeService.saveUser(this.form.value);
    } else {
      alert('form invalid');
    }
  }
}
