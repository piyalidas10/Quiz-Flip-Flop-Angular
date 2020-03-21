import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-quizexpand',
  templateUrl: './quizexpand.component.html',
  styleUrls: ['./quizexpand.component.css']
})
export class QuizexpandComponent implements OnInit {
  @Input() data: any;
  @Input() serialno: number;
  @Input() alreadychoosedans: number;
  @Output() chooseVal = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  chooseAns(slno, index) {
    const chooseAns = {slno, index};
    console.log('chooseAns => ', chooseAns);
    this.chooseVal.emit(chooseAns);
  }

}
