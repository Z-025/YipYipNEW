import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://api.citeas.org/product/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  searchByDOI(doi: string): Observable<any> {
    const url = `${this.apiUrl}${encodeURIComponent(doi)}`;
    return this.http.get(url);
  }


  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }

}
