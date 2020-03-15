import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Quiz } from '../models/quiz';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public headers: HttpHeaders;
  public RQSTOptions: any;

  constructor(private http: HttpClient) {
    this.setHeader();
   }

  setHeader() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Ecommerce-version': '1.0.0'
    });
    this.RQSTOptions = {
      // headers: this.headers,
      responseType: 'json'
    };
  }

  getData(): Observable<Quiz> {
    const apiURL = `${environment.apiEndpoint}`;
    return this.http.get(apiURL, this.RQSTOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
}

// Handle API errors
handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
}

}
