import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QuizhomeComponent } from './quizhome/quizhome.component';
import { QuizexpandComponent } from './quizexpand/quizexpand.component';

import { ApiService } from './services/api.service';

import { QuizcontainerDirective } from './quizhome/quizhome.component';
import { QuizresultComponent } from './quizresult/quizresult.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizhomeComponent,
    QuizcontainerDirective,
    QuizexpandComponent,
    QuizresultComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [ApiService],
  entryComponents: [
    QuizexpandComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
