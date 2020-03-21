import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizresultComponent } from './quizresult.component';

describe('QuizresultComponent', () => {
  let component: QuizresultComponent;
  let fixture: ComponentFixture<QuizresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
