import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  private httpClient: HttpClient = inject(HttpClient)
  
  public get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url)
  }

  public post<T>(url: string, body: any): Observable<T> {
    return this.httpClient.post<T>(url, body)
  }

  public delete<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(url)
  }

  public put<T>(url: string, body: any): Observable<T> {
    return this.httpClient.put<T>(url, body)
  }
}
