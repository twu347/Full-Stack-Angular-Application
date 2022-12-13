import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {

  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isLoggedIn !== true) {
          this.router.navigate(['signin'])
          alert("You do not have access to the page!");
        }
        else {
          alert("You have logged in!");
          
        }
        return true;
      }

} 
