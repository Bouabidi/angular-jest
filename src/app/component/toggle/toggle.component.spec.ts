import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleComponent } from './toggle.component';
import { By } from '@angular/platform-browser';

describe('ToggleComponent', () => {
  let component: ToggleComponent;
  let fixture: ComponentFixture<ToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToggleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle work', () => {
    let spanElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(spanElement.innerHTML).toEqual('xyz');

    component.toggle = true;
    fixture.detectChanges();

    spanElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(spanElement.innerHTML).toEqual('abc');
  });
});
