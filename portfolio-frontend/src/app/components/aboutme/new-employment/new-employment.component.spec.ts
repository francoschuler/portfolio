import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEmploymentComponent } from './new-employment.component';

describe('NewEmploymentComponent', () => {
  let component: NewEmploymentComponent;
  let fixture: ComponentFixture<NewEmploymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEmploymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEmploymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
