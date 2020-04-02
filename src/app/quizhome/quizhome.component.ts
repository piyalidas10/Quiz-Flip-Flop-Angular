import {
  Component, OnInit, Directive, ViewContainerRef, ViewChild, ViewChildren, QueryList,
  ComponentFactoryResolver, ElementRef, Output, EventEmitter, AfterViewInit
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { QuizexpandComponent } from '../quizexpand/quizexpand.component';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-quizhome',
  templateUrl: './quizhome.component.html',
  styleUrls: ['./quizhome.component.css']
})

export class QuizhomeComponent implements OnInit, AfterViewInit {
  public quizLists: any;
  public quizAnsLists = [];
  public startIndex = 0;
  public quizCount = 0;
  @Output() isSubmitted = new EventEmitter();
  public isSubmitBtnClicked = false;
  public config = {};
  myRef: any;

  /*
  It may be a better idea to use static:true if the child does not depend on any conditions.
  If the visibility of element changes, then static:false may give better results.
  */
  @ViewChild('quizcontainer', { read: ViewContainerRef, static: true }) entry: ViewContainerRef;

  constructor(
    public apiService: ApiService,
    private resolver: ComponentFactoryResolver,
    private ele: ElementRef,
    private sharedSrv: SharedService
  ) {
    this.getDataLists();
    this.setCOnfig();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  setCOnfig() {
    this.config = {
      allowBack: true
    };
  }

  getDataLists() {
    try {
      this.apiService.getData()
        .subscribe(
          data => {
            this.quizLists = data.questions;
            this.quizCount = this.quizLists.length;
            console.log('quizLists => ', this.quizLists);
            const originalansLists = this.quizLists.map(ele => ele.correctIndex);
            console.log('originalansLists => ', originalansLists);
            this.sharedSrv.setOriginalAnsLists(originalansLists);
          },
          err => {
            console.log('Error => ', err);
          }
        );
    } catch (error) {
      console.log('error => ', error);
    }
  }

  notifyAns(evt) {
    console.log('Question Ans => ', evt);
  }


  // ViewContainerRef — create templates or components dynamically
  openComponent(index) {
    this.entry.clear();
    console.log('openComponent entry => ', this.entry);
    const alreadyChoosedAns = this.showAlreadySelectedAns(index);
    console.log('alreadyChoosedAns => ', alreadyChoosedAns);
    const myFactory = this.resolver.resolveComponentFactory(QuizexpandComponent);
    this.myRef = this.entry.createComponent(myFactory);
    this.myRef.instance['data'] = this.quizLists[index];
    this.myRef.instance['serialno'] = index;
    this.myRef.instance['alreadychoosedans'] = alreadyChoosedAns;
    this.myRef.instance['chooseVal'].subscribe(event => {
      console.log('chooseVal => ', event);
      this.checkDuplicateAns(event);
    });
    this.myRef.changeDetectorRef.detectChanges();
  }

  closeComponent(index) {
    console.log('close component', index);
    console.log('this.myRef => ', this.myRef);
    if (this.myRef !== undefined) {
      this.myRef.destroy();
    }
  }

  expandSection(index) {
    console.log('index => ', index);
    const alreadyChoosedAns = this.showAlreadySelectedAns(index);
    const expandElement = this.ele.nativeElement.querySelectorAll('.quiz' + index)[0];
    console.log('expandElement => ', expandElement);
    const rowElement = expandElement.parentElement;
    expandElement.children[0].classList.add('is-flipped');
    this.openComponent(index);
    rowElement.classList.remove('equal');
    rowElement.classList.add('equal');
  }

  closeSection(index) {
    const closeElement = this.ele.nativeElement.querySelectorAll('.quiz' + index)[0];
    console.log('closeElement => ', closeElement);
    const rowElement = closeElement.parentElement;
    console.log('rowElement => ', rowElement);
    closeElement.children[0].classList.remove('is-flipped');
    rowElement.classList.remove('equal');
    rowElement.classList.add('equal');
    this.closeComponent(index);
  }

  showAlreadySelectedAns(index) {
    let serialNo = 0;
    console.log('quizAnsLists => ', this.quizAnsLists);
    console.log('index => ', index);
    if (this.quizAnsLists.length > 0) {
      this.quizAnsLists.forEach(ele => {
        if (ele.slno === index) {
          serialNo = ele.index;
        } else {
          serialNo = -1;
        }
      });
    } else {
      serialNo = -1;
    }
    return serialNo;
  }

  checkDuplicateAns(evt) {
    if (this.quizAnsLists.length > 0) {
      const position = this.quizAnsLists.findIndex(ele => ele.slno === evt.slno);
      console.log('position => ', position);
      if (position !== -1) {
        this.quizAnsLists[position].index = evt.index;
      } else {
        this.quizAnsLists.push(evt);
      }
    } else {
      this.quizAnsLists.push(evt);
    }
    console.log('quizAnsLists => ', this.quizAnsLists);
  }

  goTo(currentIndex, gotoIndex) {
    this.closeComponent(currentIndex);
    this.startIndex = gotoIndex;
    console.log('startIndex => ', this.startIndex);
    this.openComponent(gotoIndex);
  }

  submitQuiz() {
    this.isSubmitBtnClicked = true;
    this.sharedSrv.setQuizResult(this.quizAnsLists);
    console.log('quizAnsLists => ', this.quizAnsLists);
    this.isSubmitted.emit('true');
  }

}
