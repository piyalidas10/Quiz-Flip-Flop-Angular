import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quizexpand',
  templateUrl: './quizexpand.component.html',
  styleUrls: ['./quizexpand.component.css']
})
export class QuizexpandComponent implements OnInit {
  @Input() data: any;
  @Input() serialno: number;
  constructor() { }

  ngOnInit() {
  }

}
