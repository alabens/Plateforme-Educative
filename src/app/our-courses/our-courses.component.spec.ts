import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurCoursesComponent } from './our-courses.component';

describe('OurCoursesComponent', () => {
  let component: OurCoursesComponent;
  let fixture: ComponentFixture<OurCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
