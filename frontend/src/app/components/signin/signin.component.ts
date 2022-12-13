import { Component, OnInit } from '@angular/core';
import { AuthSettings } from 'firebase/auth';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  passwordForm = new FormGroup({
    password: new FormControl('', [Validators.required])
  });


  


  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

   get email() {
    return this.emailForm.get('email');
  }

  get password() {
    return this.passwordForm.get('password');
  }

}
