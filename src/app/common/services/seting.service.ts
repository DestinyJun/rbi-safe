import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetingService {

  constructor(
    private http: HttpClient
  ) {
  }

  /**
   * 公司人员管理模块
   * @param  pamars 请求参数
   */
  // 分页公司人员
  public getPersonnelPageData(pamars): Observable<any> {
    return this.http.post(`/company_personnel/query/page`, pamars);
  }

  // 新增公司人员信息
  public addPersonnelInfo(pamars): Observable<any> {
    return this.http.post(`/company_personnel/add`, pamars);
  }

  // 批量删除公司人员信息
  public delPersonnelInfo(pamars): Observable<any> {
    return this.http.post(`/company_personnel/delete`, pamars);
  }

  // 密码重置
  public resetPwd(pamars): Observable<any> {
    return this.http.post(`/resetPwd`, pamars);
  }

  // 更新公司人员信息
  public updatePersonnelInfo(pamars): Observable<any> {
    return this.http.post(`/company_personnel/update`, pamars);
  }

  // 更新公司人员信息
  public imoprtPersonnelInfoFile(pamars): Observable<any> {
    return this.http.post(`/company_personnel/excel_import`, pamars);
  }

  /**
   * 用户模块
   */
  // 分页查询用户信息
  public getUserInfoPageData(pamars): Observable<any> {
    return this.http.post(`/pageQueryUserInfo`, pamars);
  }

  // 删除用户信息
  public delUserInfo(pamars): Observable<any> {
    return this.http.post(`/deleteUser`, pamars);
  }

  // 删除用户信息
  public updateUserInfo(pamars): Observable<any> {
    return this.http.post(`/updateUser`, pamars);
  }

  // 删除用户信息
  public addUserInfo(pamars): Observable<any> {
    return this.http.post(`/insertUser`, pamars);
  }

  /**
   * 组织管理模块
   * @param pamars sdasd
   */
  // 分页查询组织信息
  public  getOrgazitionInfoPageData(pamars): Observable<any> {
    return this.http.post(`/pageOrganization`, pamars);
  }
  // 添加组织
  public  addOrgazitionInfo(pamars): Observable<any> {
    return this.http.post(`/insertOrganization`, pamars);
  }
  // 更新组织
  public updateOrgazitionInfo(pamars): Observable<any> {
    return this.http.post(`/updateOrganization`, pamars);
  }

  /**
   * 角色模块
   * @param pamars dasdad
   */
  // 分页角色信息
  public  getRoleInfoPageData(pamars): Observable<any> {
    return this.http.post(`/pageRole`, pamars);
  }

  // 添加角色信息
  public  addRoleInfo(pamars): Observable<any> {
    return this.http.post(`/insertRole`, pamars);
  }

  // 更新角色信息
  public  updateRoleInfo(pamars): Observable<any> {
    return this.http.post(`/updateRole`, pamars);
  }


  /**
   * 权限模块
   * @param pamars
   */
  // 分页权限信息
  public  getPermissionInfoPageData(pamars): Observable<any> {
    return this.http.post(`/sysPermission/findSysPermissionByPage`, pamars);
  }

  // 获取权限树
  public  getPermissionTreeInfo(params): Observable<any> {
    return this.http.post(`/sysPermission/permissionTreeByPage`, params);
  }

  // 添加权限信息
  public  addPermissionInfo(pamars): Observable<any> {
    return this.http.post(`/sysPermission/insertSysPermission`, pamars);
  }

  // 更新权限信息
  public  updatePermissionInfo(pamars): Observable<any> {
    return this.http.post(`/sysPermission/updateSysPermission`, pamars);
  }

  // 删除权限信息
  public  delPermissionInfo(pamars): Observable<any> {
    return this.http.post(`/sysPermission/deleteSysPermissionById`, pamars);
  }

  // 根据id查询权限
  public  queryPermissionInfoById(pamars): Observable<any> {
    return this.http.post(`/sysPermission/findSysPermissionById`, pamars);
  }

  // 上传APp
  public  sendNewApp(pamars): Observable<any> {
    return this.http.post(`/sendNewApp`, pamars);
  }
  public  findNewAppMessage(pamars): Observable<any> {
    return this.http.post(`/findNewAppMessage`, pamars);
  }
}
