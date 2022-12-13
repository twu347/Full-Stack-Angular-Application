import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-policy',
  templateUrl: './admin-policy.component.html',
  styleUrls: ['./admin-policy.component.scss']
})
export class AdminPolicyComponent implements OnInit {
  createPrivacyTitle: string='';
  createPrivacyContent: string='';
  updatePrivacyID: any;
  updatePrivacyTitle:string='';
  updatePrivacyContent: string='';
  deletePrivacyTitle:string='';


  createDMCATitle: string='';
  createDMCAContent: string='';
  updateDMCAID: any;
  updateDMCAContent: string='';
  updateDMCATitle: string='';
  deleteDMCATitle:string='';


  createAcceptTitle: string='';
  createAcceptContent: string='';
  updateAcceptID: any;
  updateAcceptContent: string='';
  updateAcceptTitle: string='';
  deleteAcceptTitle:string='';  

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  
  createPrivacy(){
  this.http.post(`http://localhost:3000/api/post/privacy`,{"title": this.createPrivacyTitle, "content":this.createPrivacyContent}).subscribe(
    res=>{
      alert("create success!");
    }
  )
}

createDMCA(){
  this.http.post(`http://localhost:3000/api/post/DMCA`,{"title": this.createDMCATitle, "content":this.createDMCAContent}).subscribe(
    res=>{
      alert("create success!");
    }
  )
}


createAccept(){
  this.http.post(`http://localhost:3000/api/post/Accept`,{"title": this.createAcceptTitle, "content":this.createAcceptContent}).subscribe(
    res=>{
alert("create success!");
    }
  )
}


updatePrivacy(){
  this.http.put(`http://localhost:3000/api/put/privacy/${this.updatePrivacyID}`,{"title": this.updatePrivacyTitle, "content":this.updatePrivacyContent}).subscribe(
    res=>{
        alert("update success!");
    }
  )
}


updateDMCA(){
  this.http.put(`http://localhost:3000/api/put/DMCA/${this.updateDMCAID}`,{"title": this.updateDMCATitle, "content":this.updateDMCAContent}).subscribe(
    res=>{
        alert("update success!");
    }
  )
}


updateAccept(){
  this.http.put(`http://localhost:3000/api/put/Accept/${this.updateAcceptID}`,{"title": this.updateAcceptTitle, "content":this.updateAcceptContent}).subscribe(
    res=>{
        alert("update success!");
    }
  )
}


deletePrivacy(){
  this.http.delete(`http://localhost:3000/api/delete/privacy/${this.deletePrivacyTitle}`).subscribe(
    res=>{
      alert("Deleted !");
    }
  )
}


deleteDMCA(){
  this.http.delete(`http://localhost:3000/api/delete/DMCA/${this.deleteDMCATitle}`).subscribe(
    res=>{
      alert("Deleted !");
    }
  )
}

deleteAccept(){
  this.http.delete(`http://localhost:3000/api/delete/Accept/${this.deleteAcceptTitle}`).subscribe(
    res=>{
      alert("Deleted !");
    }
  )
}

}
