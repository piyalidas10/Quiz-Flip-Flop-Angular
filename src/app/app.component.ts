import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'flipflop-one';
  public isResultSubmitted = false;

  checkIsSubmitted(evt) {
    console.log('evt => ', evt);
    if (evt === 'true') {
      this.isResultSubmitted = true;
    }
  }
}
