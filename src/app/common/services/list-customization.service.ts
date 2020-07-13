import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListCustomizationService {

  constructor(private http: HttpClient) { }


  public page(body: any): Observable<any> {
    return this.http.post('/db_template/findByPage', body);
  }

  public update(body: any): Observable<any> {
    return this.http.post('/db_template/update', body);
  }

  public add(body: any): Observable<any> {
    return this.http.post('/db_template/add', body);
  }

  public delete(body: any): Observable<any> {
    return this.http.post('/db_template/delete', body);
  }
}
