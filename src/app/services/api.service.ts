import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
  ) { }

  public get<T>(url: string, params?: HttpParams): Observable<T> {
    const httpParams = params || new HttpParams();

    return this.http.get<T>(url, {params: httpParams})
      .pipe(
        catchError(this.handleError<T>(`get${url}`, [] as T)),
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);

      return of(result as T);
    };
  }
}
