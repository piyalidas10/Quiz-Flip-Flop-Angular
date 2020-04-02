import {
    Directive, Input, Output, EventEmitter, ElementRef,
    HostListener, Renderer2, ViewContainerRef, ComponentFactoryResolver, OnInit, OnChanges
} from '@angular/core';

@Directive({
    selector: '[quizcontainer]'
})

export class QuizcontainerDirective1 implements OnInit {
    @Input() quizData: object;
    @Input() quizIndex: number;
    @Input() componentName: any;
    @Input() alreadyChoosedAns: any;
    @Output() close = new EventEmitter<any>();

    constructor(
        private el: ElementRef,
        private ren: Renderer2,
        private viewContainer: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }

    ngOnInit() {
    }

    createQuizComp(comp) {
        console.log('CreateModalDialog is called');
        this.viewContainer.clear();
        const myFactory = this.componentFactoryResolver.resolveComponentFactory(comp);
        const myRef = this.viewContainer.createComponent(myFactory);
        myRef.instance['data'] = this.quizData;
        myRef.instance['serialno'] = quizIndex;
        myRef.instance['alreadychoosedans'] = alreadyChoosedAns;
        return modalDialogComponentRef;
    }
}