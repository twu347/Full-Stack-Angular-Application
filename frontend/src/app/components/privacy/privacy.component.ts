import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    
  }

  showPrivacies: boolean = true;

  showPolicies: boolean= true;

  showDMCAs: boolean = true;

  showPrivacy() {
    this.showPrivacies = !this.showPrivacies;
    this.showPolicies = false;
    this.showDMCAs = false;
  }

  showPolicy() {
    this.showPolicies = !this.showPolicies ;
    this.showPrivacies = false;
    this.showDMCAs = false;
  }

  showDMCA(){
    this.showDMCAs  = !this.showDMCAs;
    this.showPolicies = false;
    this.showPrivacies = false;
  }

 privacy: any =[];
 

  getPrivacy() {
    this.httpClient.get<any>('http://localhost:3000/api/privacy').subscribe(
      response => {
        console.log(response);
        this.privacy = response;
      }
    );
  }

  accepts: any = [];

   getAccepts() {
    this.httpClient.get<any>('http://localhost:3000/api/accept').subscribe(
      response => {
        console.log(response);
        this.accepts = response;
      }
    );
  }
  dmcas: any = [];

  getDMCAs() {
    this.httpClient.get<any>('http://localhost:3000/api/dmca').subscribe(
      response => {
        console.log(response);
        this.dmcas = response;
      }
    );
  }

 



}
