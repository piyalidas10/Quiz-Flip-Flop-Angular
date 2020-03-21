import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  datasource = new BehaviorSubject<any>([]);
  originalanslists = new BehaviorSubject<any>([]);

  setOriginalAnsLists(content) {
    this.originalanslists.next(content);
  }

  setQuizResult(content) {
    this.datasource.next(content);
  }
}
