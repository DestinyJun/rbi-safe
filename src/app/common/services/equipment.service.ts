import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private http: HttpClient) { }

  /** * 安全设备管理 */
  /**
   * 安全设备分页查看
   * @param params
   */
  public equipmentSafeList(params: any): Observable<any> {
    return this.http.post(`/equipment/pageSafe`, params);
  }

  /**
   * 安全设备新增
   * @param params
   */
  public equipmentSafeAdd(params: any): Observable<any> {
    return this.http.post(`/equipment/addSafe`, params);
  }

  /**
   * 安全设备删除
   * @param params
   */
  public equipmentSafeDel(params: any): Observable<any> {
    return this.http.post(`/equipment/deleteSafe`, params);
  }

  /**
   * 安全设备更新
   * @param params
   */
  public equipmentSafeUpdate(params: any): Observable<any> {
    return this.http.post(`/equipment/updateSafe`, params);
  }

  /** * 特种设备管理 */
  /**
   * 分页查看特种设备
   * @param params
   */
  public equipmentSpecialList(params: any): Observable<any> {
    return this.http.post(`/equipment/pageSpecial`, params);
  }

  /**
   * 新增特种设备
   * @param params
   */
  public equipmentSpecialAdd(params: any): Observable<any> {
    return this.http.post(`/equipment/addSpecial`, params);
  }

  /**
   * 删除特种设备
   * @param params
   */
  public equipmentSpecialDel(params: any): Observable<any> {
    return this.http.post(`/equipment/deleteSpecial`, params);
  }

  /**
   * 更新特种设备
   * @param params
   */
  public equipmentSpecialUpdate(params: any): Observable<any> {
    return this.http.post(`/equipment/updateSpecial`, params);
  }

  /** * 其他设备管理 */
  /**
   * 分页查看其他设备
   * @param params
   */
  public equipmentOtherList(params: any): Observable<any> {
    return this.http.post(`/equipment/pageOther`, params);
  }

  /**
   * 新增其他设备
   * @param params
   */
  public equipmentOtherAdd(params: any): Observable<any> {
    return this.http.post(`/equipment/addOther`, params);
  }

  /**
   * 删除其他设备
   * @param params
   */
  public equipmentOtherDel(params: any): Observable<any> {
    return this.http.post(`/equipment/deleteOther`, params);
  }

  /**
   * 更新其他设备
   * @param params
   */
  public equipmentOtherUpdate(params: any): Observable<any> {
    return this.http.post(`/equipment/updateOther`, params);
  }
}
