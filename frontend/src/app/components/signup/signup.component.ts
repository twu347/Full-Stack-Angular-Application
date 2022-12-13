import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
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
