import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {LocalStorageService} from '../services/local-storage.service';
import {Location} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private localStorageSrv: LocalStorageService,
    public route: Router,

  ) {}
  canActivate() {
    if (this.localStorageSrv.get('token')){
      return true;
    }else {
      this.route.navigate(['/login']);
      return false;
    }
  }
}
