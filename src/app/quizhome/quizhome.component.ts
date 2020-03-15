import { Component, OnInit, Directive, ViewContainerRef, ViewChildren, QueryList, ComponentFactoryResolver, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { QuizexpandComponent } from '../quizexpand/quizexpand.component';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[quizcontainer]',
})
export class QuizcontainerDirective  {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}

@Component({
  selector: 'app-quizhome',
  templateUrl: './quizhome.component.html',
  styleUrls: ['./quizhome.component.css']
})

export class QuizhomeComponent implements OnInit {
  quizLists: any;

  // @ViewChildren decorator to grab elements from the host view
  /* The return type of ViewChildren is QueryList.
  QueryList is just a fancy name for an object that stores
  a list of items. What is special about this object is
  when the state of the application changes Angular will
  automatically update the object items for you. */
  @ViewChildren (QuizcontainerDirective) entry: QueryList<QuizcontainerDirective>;

  constructor(
    public apiService: ApiService,
    private resolver: ComponentFactoryResolver,
    private ele: ElementRef
  ) {
    this.getDataLists();
  }

  ngOnInit() {
  }

  getDataLists() {
    try {
      this.apiService.getData()
        .subscribe(
          data => {
            this.quizLists = data.questions;
            console.log('quizLists => ', this.quizLists);
          },
          err => {
            console.log('Error => ', err);
          }
        );
      } catch (error) {
        console.log('error => ', error);
      }
  }

  // ViewContainerRef — create templates or components dynamically
  public openComponent(index) {
    console.log(this.entry);
    const myFactory = this.resolver.resolveComponentFactory(QuizexpandComponent);
    if (this.entry.toArray()[index].viewContainerRef.length <= 0 ) {
      const myRef = this.entry.toArray()[index].viewContainerRef.createComponent(myFactory);
      myRef.instance['data'] = this.quizLists[index];
      myRef.instance['serialno'] = index;
      myRef.changeDetectorRef.detectChanges();
    }
  }

  public closeComponent(index) {
    this.entry[index].ViewContainerRef.remove();
  }

  public expandSection(index) {
    const expandElement = this.ele.nativeElement.querySelectorAll('.quiz' + index)[0];
    console.log('expandElement => ', expandElement);
    const rowElement = expandElement.parentElement;
    expandElement.children[0].classList.add('is-flipped');
    this.openComponent(index);
    rowElement.classList.remove('equal');
    rowElement.classList.add('equal');
  }

  public closeSection(index) {
    const closeElement = this.ele.nativeElement.querySelectorAll('.quiz' + index)[0];
    console.log('closeElement => ', closeElement);
    const rowElement = closeElement.parentElement;
    console.log('rowElement => ', rowElement);
    closeElement.children[0].classList.remove('is-flipped');
    rowElement.classList.remove('equal');
    rowElement.classList.add('equal');
  }

}
