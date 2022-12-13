import { Component, OnInit, enableProdMode, EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { of } from 'rxjs';
import { TrackSearchService } from 'src/app/shared/services/track-search.service';
import { TrackResultComponent } from '../track-result/track-result.component';
import { CommentService } from 'src/app/shared/services/comment.service';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

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

  ids0: string='';
  ids1:string='';
  ids2:string='';
  listArray1: any=[];
  listArray2: any=[];
  listArray0: any=[];

  enteredValue3: string = '';

  artist: object = [];

  trackListArray: any=[];

  title: string = '';

  addDesListArray: any = [];

  addDescription: string = '';


  //Comment
  commentListName: string = '';
  addComment: string = ''; //define comment
  addCommentArray: any = [];


  //Ratings
  ratingListName: string = '';
  addRating: string = ''; //define comment
  addRatingArray: any = [];

  //public or private list
  listStatus: boolean = false;

  //creator
  creatorName: string = '';
  addCreator: string = ''; //define comment
  addCreatorArray: any = [];

  constructor(
    private value: TrackResultComponent,
    private trackService: TrackSearchService,
    private httpClient: HttpClient,
    private hideService: CommentService,
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

     this.hideService.toggle.subscribe(status => this.listStatus = status);
    
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
    this.listArray0= this.ids0.split(',');
    this.listArray1= this.ids1.split(',');
    this.listArray2= this.ids2.split(',');
    this.trackListArray = this.title.split(',');
    this.addDesListArray = this.addDescription.split(',');
    this.addRatingArray = this.addRating;
    this.addCreatorArray = this.addCreator;
    console.log(this.listArray0);
    this.trackService.createList(this.newListName,this.listArray0,  this.listArray1, this.listArray2,this.trackListArray, this.addDesListArray, this.addCommentArray, this.addRatingArray, this.addCreatorArray);
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


