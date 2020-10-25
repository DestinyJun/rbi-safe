import {Injectable} from '@angular/core';
import {HttpEvent, HttpRequest, HttpHandler, HttpInterceptor} from '@angular/common/http';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, tap, timeout} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AppState} from '../../store/loadstatus.state';
import {GlobalService} from './global.service';
// import {environment} from '../../../environments/environment';
import {LocalStorageService} from './local-storage.service';
import {Store} from '@ngrx/store';
import {PublicMethodService} from '../public/public-method.service';
import {environment} from '../../../environments/environment';
import {Location} from '@angular/common';
// import {environment} from '../../../environments/environment.zga';
const DEFAULTTIMEOUT = 100000000;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public clonedRequest: any; // 重置请求参数
  public skipState = [`1000`]; // 需要处理的状态码
  public skipUrl = [
    `/company_personnel/excel_import`,
    `/uploadSystemDocuments`,
    `/hid/addReport`,
    `/hid/addOrder`,
    '/training/add',
    `/hid/complete`,
    `/seriousDanger/insertSeriousDanger`,
    `/risk/addInside`,
    `/risk/addOutside`,
    `/risk/update`,
    `/regularMonitoring/update`,
    `/regularMonitoring/add`,
    `/statusEvaluation/update`,
    `/statusEvaluation/add`,
    `/seriousDanger/updateSeriousDanger`,
    `/notice/add`,
    `/importSubject`,
    `/training/importAdmin`,
    `/healthExamine/excelImport`,
    `/diseaseProtection/excelImport`,
    `/occHealthMaintain/excelImport`,
    `/occHealthEquipment/excelImport`,
    `/health_project/excelImport`,
    `/occHealthEndanger/excelImport`,
    `/diseaseFactors/excelImport`,
    `/dailyMonitoring/excelImport`,
    `/regularMonitoring/excelImport`,
    `/statusEvaluation/excelImport`,
    `/health_project/excelwrite`,
    `/statusEvaluation/excelwrite`,
    `/regularMonitoring/excelwrite`,
    `/dailyMonitoring/excelwrite`,
    '/risk/excelImport_inside',
    '/risk/excelImport_outside',
    `/training/importSpecialTrainings`,
    `/safeFourLevel/excelImport`,
    `/sendNewApp`,
    `/training/findByMaterialId`,
  ]; // 无需验证的请求地址
  public skipUrlPre = [
    `http://10.40.1.121:8000/complain/production/findAll`,
    `http://61.189.169.44:8090/security-platform/production/findAll`,
    // `http://61.189.169.44:8090/security-platform/training/findByMaterialId`,
  ]; // 跳过不需要验证且不加前缀的请求
  constructor(
    private globalService: GlobalService,
    private router: Router,
    private localSessionStorage: LocalStorageService,
    private toolSrv: PublicMethodService,
    private store: Store<AppState>,
    public location: Location
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log(environment.name);
    if (environment.production) {
      return this.prod_http(req, next);
    } else {
      return this.debug_http(req, next);
      // return this.prod_http(req, next);
    }
  }

  public debug_http(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 修改请求状态
    this.store.dispatch({type: 'false'});
    if (this.skipUrlPre.indexOf(req.url) > -1) {
      this.clonedRequest = req;
    }
    else if (req.url.includes('http://61.189.169.44:8000/file')) {
      this.clonedRequest = req;
    }
    else if (req.url.includes('/usr/work')) {
      this.clonedRequest = req;
    }
    else if (this.isSkipUrl(req.url)) {
      this.clonedRequest = req.clone({
        url: environment.url_safe + req.url,
        headers: req.headers
          .set('accessToken', this.localSessionStorage.get('token'))
      });
    }
    else if (req.url === '/login') {
      this.clonedRequest = req.clone({
        url: environment.url_safe + req.url,
        headers: req.headers
          .set('Content-type', 'application/json; charset=UTF-8')
      });
    }
    else {
      // 判断是否有请求头，没有则使用本地token
      let accessToken = req.headers.get('accessToken');
      if (!accessToken) { // 请求中没有token就使用本地的token
        accessToken = this.localSessionStorage.get('token');
      }
      this.clonedRequest = req.clone({
        url: environment.url_safe + req.url,
        headers: req.headers
          .set('Content-type', 'application/json; charset=UTF-8')
          .set('accessToken', accessToken)
      });
    }
    return next.handle(this.clonedRequest).pipe(
      timeout(DEFAULTTIMEOUT),
      tap((event: any) => {
        this.store.dispatch({type: 'true'});
        if (event.status === 200) {
          if (this.skipState.includes(event.body.status) || event.url.includes('/usr/work') || event.url.includes('http://61.189.169.44:8000/file')) {
            // this.toolSrv.setToast('success', '请求成功', event.body.message);
            return of(event);
          } else {
            throw event;
          }
        }
        else if (event.status === 500) {
          throw event;
        }
      }),
      catchError((error: any) => {
        if (error.status === 500) {
          this.router.navigate(['/error'], {
            queryParams: {
              msg: '连接服务器失败，请检查网络！',
              status: error.status,
              btn: '请重试'
            }
          });
          return EMPTY;
        }else if (error.status === 200) {
          if (error.body.status === '1002') {
            this.router.navigate(['/login']);
            return EMPTY;
          } else {
            this.toolSrv.setToast('error', '请求错误', error.body.message);
            return EMPTY;
          }
          // this.router.navigate(['/error'], {
          //   queryParams: {
          //     msg: error.body.msg,
          //     status: error.body.status,
          //     btn: '请重试'
          //   }
          // });
        }
      })
    );
  }

  public prod_http(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 修改请求状态
    this.store.dispatch({type: 'false'});
    if (this.skipUrlPre.indexOf(req.url) > -1) {
      this.clonedRequest = req;
    }
    else if (req.url.includes('http://61.189.169.44:8000/file')) {
      this.clonedRequest = req;
    }
    else if (req.url.includes('/training/findByMaterialId')) {
      this.clonedRequest = req.clone({
        url: environment.url_safe + req.url,
        headers: req.headers
      });
    }
    else if (req.url.includes('/usr/work')) {
      this.clonedRequest = req;
    }
    else if (this.isSkipUrl(req.url)) {
      this.clonedRequest = req.clone({
        url: environment.url_safe + req.url,
        headers: req.headers
          .set('accessToken', this.localSessionStorage.get('token'))
      });
    }
    else if (req.url === '/login') {
      this.clonedRequest = req.clone({
        url: environment.url_safe + req.url,
        headers: req.headers
          .set('Content-type', 'application/json; charset=UTF-8')
      });
    }
    else {
      this.clonedRequest = req.clone({
        url: environment.url_safe + req.url,
        headers: req.headers
          .set('Content-type', 'application/json; charset=UTF-8')
          .set('accessToken', this.localSessionStorage.get('token'))
      });
    }
    return next.handle(this.clonedRequest).pipe(
      timeout(DEFAULTTIMEOUT),
      tap((event: any) => {
        this.store.dispatch({type: 'true'});
        if (event.status === 200) {
          if (this.skipState.includes(event.body.status) || event.url.includes('/usr/work') || event.url.includes('http://61.189.169.44:8000/file')) {
            // this.toolSrv.setToast('success', '请求成功', event.body.message);
            return of(event);
          } else {
            throw event;
          }
        } else if (event.status === 500) {
          throw event;
        }
      }),
      catchError((error: any) => {
        if (error.status === 500) {
          this.router.navigate(['/error'], {
            queryParams: {
              msg: '连接服务器失败，请检查网络！',
              status: error.status,
              btn: '请重试'
            }
          });
          return EMPTY;
        }
        if (error.status === 200) {
          if (error.body.status === '1002') {
            this.router.navigate(['/login']);
            return EMPTY;
          } else {
            this.toolSrv.setToast('error', '请求错误', error.body.message);
            return EMPTY;
          }
          // this.router.navigate(['/error'], {
          //   queryParams: {
          //     msg: error.body.msg,
          //     status: error.body.status,
          //     btn: '请重试'
          //   }
          // });
        }
      })
    );
  }

  // url跳过验证
  public isSkipUrl(url: string) {
    return this.skipUrl.includes(url);
  }
}
