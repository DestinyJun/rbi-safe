import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeListFileService {

  constructor(private http: HttpClient) { }


  public page(body: any): Observable<any> {
    return this.http.post('/db_file/findByPage', body);
  }
}
