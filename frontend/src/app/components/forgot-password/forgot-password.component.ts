import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
   emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

   get email() {
    return this.emailForm.get('email');
  }
}
