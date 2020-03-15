import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizexpandComponent } from './quizexpand.component';

describe('QuizexpandComponent', () => {
  let component: QuizexpandComponent;
  let fixture: ComponentFixture<QuizexpandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizexpandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizexpandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
