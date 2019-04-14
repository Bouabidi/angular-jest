import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FakeService } from './fake.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let fakeService;

  beforeEach(async(() => {
    fakeService = { saveUser: jest.fn() };
    TestBed.configureTestingModule({
      declarations: [
        FormComponent,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: FakeService,
          useValue: fakeService,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should reset form when reset button clicked', fakeAsync(() => {
    component.form.patchValue({
      name: 'dkls',
      gender: 'Male',
      mobile: 18309092929,
      address: null,
      comment: null,
      birthday: null,
    });
    const resetButton: HTMLButtonElement = fixture.debugElement.query(By.css('.btn-outline-primary')).nativeElement;
    expect(resetButton).toBeTruthy();

    resetButton.click();
    tick();
    expect(component.form.value).toEqual({
      name: null,
      gender: null,
      mobile: null,
      address: null,
      comment: null,
      birthday: null,
    });
  }));
  it('should not call fake service to save invalid when submit button clicked', fakeAsync(() => {
    spyOn(window, 'alert');
    const submitButton: HTMLButtonElement = fixture.debugElement.query(By.css('.btn-primary')).nativeElement;
    expect(submitButton).toBeTruthy();

    submitButton.click();
    tick();
    expect(fakeService.saveUser).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('form invalid');
  }));
  it('should not call fake service to save invalid when submit button clicked', fakeAsync(() => {
    component.form.patchValue({
      name: 'some name',
      gender: 'Male',
      mobile: 18309092929,
      address: null,
      comment: null,
      birthday: null,
    });
    const submitButton: HTMLButtonElement = fixture.debugElement.query(By.css('.btn-primary')).nativeElement;
    submitButton.click();
    tick();
    expect(fakeService.saveUser).toHaveBeenCalledWith({
      name: 'some name',
      gender: 'Male',
      mobile: 18309092929,
      address: null,
      comment: null,
      birthday: null,
    });
  }));
});
