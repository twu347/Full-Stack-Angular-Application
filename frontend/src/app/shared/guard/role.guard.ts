import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlSerializer, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthService } from '../services/auth.service';
import { User } from '../services/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(public authService: AuthService, public router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let Role = localStorage.getItem('userType');
    if(Role == "Admin") {
      return true;
    }
    alert ("You do not have the permission");
    return false;  
}

}