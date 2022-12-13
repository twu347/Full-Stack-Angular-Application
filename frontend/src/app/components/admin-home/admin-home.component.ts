import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})

export class AdminHomeComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {}

  showUserData() {}
  
}
