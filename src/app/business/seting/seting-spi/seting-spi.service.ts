import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SetingSpiService {

  constructor(private http: HttpClient) { }

  /** ********************* spi系数设定模块 ********************* */
  /**
   * spi系数设定模块树分页查看
   * @param params
   */
  public setingSpiList(params: any): Observable<any> {
    return this.http.post(`/spi/findByPage`, params);
  }

  /**
   * spi系数设定模块树新增
   * @param params
   */
  public setingSpiAdd(params: any): Observable<any> {
    return this.http.post(`/spi/add`, params);
  }

  /**
   * spi系数设定模块树删除
   * @param params
   */
  public setingSpiDel(params: any): Observable<any> {
    return this.http.post(`/spi/delete`, params);
  }

  /**
   * spi系数设定模块树修改
   * @param params
   */
  public setingSpiUpdate(params: any): Observable<any> {
    return this.http.post(`/spi/update`, params);
  }

  /**
   * spi系数设定模块树查看周期阈值
   */
  public setingSpiViewSill(): Observable<any> {
    return this.http.post(`/spi/findHead`, {});
  }

  /**
   * spi系数设定模块开关
   */
  public setingSpiSwitch(params): Observable<any> {
    return this.http.post(`/spi/start`, params);
  }

  /**
   * spi系数设定模块树修改周期阈值
   * @param params
   */
  public setingSpiUpdateSill(params: any): Observable<any> {
    return this.http.post(`/spi/updateHead`, params);
  }


}
