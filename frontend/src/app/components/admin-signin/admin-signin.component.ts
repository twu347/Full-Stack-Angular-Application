import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Component({
  selector: 'app-admin-signin',
  templateUrl: './admin-signin.component.html',
  styleUrls: ['./admin-signin.component.scss']
})
export class AdminSigninComponent implements OnInit {

 emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });
  

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }



   get email() {
    return this.emailForm.get('email');
  }

  Login() {
    const inputEmail = (<HTMLInputElement>document.getElementById('username')).value;
    const inputPassword = (<HTMLInputElement>document.getElementById('password')).value;
    const email = "calvinxd254@gmail.com";
    const password = "1234567890";

    if(inputEmail == email && inputPassword == password) {
      this.router.navigate(['admin']);
    }
    else {
      window.alert("Invalid Access");
    }
  }



  getUserData() {
   
    const userData = this.authService.getUserData();
    
  }
   



}
