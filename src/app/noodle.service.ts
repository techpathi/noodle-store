import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Noodle } from './model/noodle';

@Injectable({
  providedIn: 'root'
})
export class NoodleService {

  NOODLEAPIURL = 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/TopRamen8d30951.json';

  NOODLEIMAGEAPIURL = 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/noodlesec253ad.json';

  constructor(private httpClient: HttpClient) { }

  getAllNoodles():Observable<any> {
    return this.httpClient.get<any>(this.NOODLEAPIURL).
      pipe(tap(data => { console.log('All noodles:'+data) }),
      catchError(this.handleError));
  }

  getAllNoodleImages():Observable<any> {
    return this.httpClient.get<any>(this.NOODLEIMAGEAPIURL).
      pipe(tap(data => { console.log('All noodles images:'+data) }),
      catchError(this.handleError));
  }


  private handleError(err: HttpErrorResponse) {
    let errMsg = '';
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', err.error.message);
      errMsg = err.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(`Backend returned code ${err.status}`);
      errMsg = err.error.status;
    }
    return throwError(errMsg);
  }

}
