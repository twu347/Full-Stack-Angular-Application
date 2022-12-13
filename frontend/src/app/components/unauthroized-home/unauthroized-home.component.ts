import { Component, OnInit, enableProdMode, EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { of } from 'rxjs';
import { TrackSearchService } from 'src/app/shared/services/track-search.service';
import { TrackResultComponent } from '../track-result/track-result.component';

@Component({
  selector: 'app-unauthroized-home',
  templateUrl: './unauthroized-home.component.html',
  styleUrls: ['./unauthroized-home.component.scss']
})
export class UnauthroizedHomeComponent implements OnInit {

  tenLists: any =[];

  deleteListName: string = '';

  updateNewIDs: string ='';

  updateListName: any='';

  trackedID: any = [];

  tracked: any = [];

  trackedListArray: any=[]; 

  lists: any=[];

  isReadMore: boolean = false;

  isTrack: boolean= false;

  isDetail: boolean = false;

  tracks: any = [];

  enteredValue: string = '';
  

  enteredValue2: string = '';

  newListName: string='';

  ids: string='';

  listArray: any=[];

  enteredValue3: string = '';

  artist: object = [];

  trackListArray: any=[];

  constructor(
    private value: TrackResultComponent,
    private trackService: TrackSearchService,
    private httpClient: HttpClient,
  ) {}

  ngOnInit(): void {
    this.trackService.showList().subscribe(
      res=>{
        this.lists=res;
        this.tenLists = this.lists.slice(0,10);
        this.trackByID();
        console.log(this.trackedID);
      }
    );
  }

  getTrack() {
    if(this.enteredValue=='' && this.enteredValue2=='' && this.enteredValue3=='')
       this.tracks=[];
       else{this.trackService.getTrack(this.enteredValue, this.enteredValue2, this.enteredValue3).subscribe((data: any) => {
        
        this.tracks = data;
        console.log(this.tracks);
      });}
    

    
  }

  showText() {
    this.isReadMore = !this.isReadMore;
  }

  showList() {
    this.isDetail = !this.isDetail;
  }

  showTrack(){
    this.isTrack = !this.isTrack;
  }


// only for authenrized users 
  createList(){
    this.listArray= this.ids.split(',');
    console.log(this.listArray);
  }

  updateList(){
        this.httpClient.put(`http://localhost:3000/api/put/${this.updateListName}`,{ "trackIDs":this.updateNewIDs.split(',') }).subscribe(
          res=>{

          }
        )
        
        ;
        
  }

  deleteList(){
        this.httpClient.delete(`http://localhost:3000/api/delete/${this.deleteListName}`).subscribe(
          req=>{}
        )
  }




  trackByID(){
    for(var i=0; i< this.lists.length; i++){
          for(var j=0; j< this.lists[i].trackIDs.length; j++){
            this.httpClient.get(`http://localhost:3000/api/trackID/${(this.lists[i].trackIDs)[j]}`).subscribe(
              (res: any)=>{
                  this.tracked.push(res);
              }
            )
          }

          this.trackedListArray.push(this.tracked);
          console.log(this.trackedListArray);
    }
    
    this.trackedID=this.trackedListArray[0];
    
  }


}
