import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TrackResultComponent } from '../track-result/track-result.component';
import { TrackSearchService } from 'src/app/shared/services/track-search.service';
import { HttpClient } from '@angular/common/http';
import { CommentService } from 'src/app/shared/services/comment.service';
import { MatExpansionModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@Component({
  selector: 'app-authorized-homepage',
  templateUrl: './authorized-homepage.component.html',
  styleUrls: ['./authorized-homepage.component.scss'],

})
export class AuthorizedHomepageComponent implements OnInit {

  panelOpenState = false;
  // 10 lists on homePage
  tenLists: any =[];

  deleteListName: string = '';

  //update values
  updateNewIDs: string ='';
  updateNewIDs1: string ='';
  updateNewIDs2: string ='';
  updateNewIDs3: string ='';
  updateNewIDs4: string ='';


  updateNewTitles: string ='';
  updateNewDescriptions: string='';

  //Delete Values
  deleteIDs: string = '';
  deleteTitles: string = '';
  deleteDescriptions: string = '';


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

  listArray0: any=[];
  listArray1: any=[];
  listArray2: any=[];

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
  addRating!: number; //define comment
  addRatingArray: any = [];

  //list is public or not
  listStatus : boolean = false;
//creator
  creatorName: string = '';
  addCreator: string = ''; //define comment
  addCreatorArray: any = [];

  constructor(
    private value: TrackResultComponent,
    private trackService: TrackSearchService,
    private httpClient: HttpClient,
    public authService: AuthService,
    private hideService: CommentService,
  ) {}

  ngOnInit(): void {
    this.trackService.showList().subscribe(
      res=>{
        this.lists=res;
        // this.trackByID();
        console.log(this.trackedID);
      });
  }

  getTrack() {
    if(this.enteredValue=='' && this.enteredValue2=='' && this.enteredValue3=='')
       this.tracks=[];
       else{this.trackService.getTrack(this.enteredValue.replace(/ /g, ''), this.enteredValue2.replace(/\s#[0-9]+/g, '').replace(/\s/,'_'), this.enteredValue3.replace(/ /g, '')).subscribe((data: any) => {
        this.tracks = data;
        console.log(this.tracks);
      });
    }
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
    this.listArray0= this.ids0;
    this.listArray1= this.ids1;
    this.listArray2= this.ids2;
    this.trackListArray = this.title.split(',');
    this.addDesListArray = this.addDescription.split(',');
    this.addCommentArray = this.addComment;
    this.addRatingArray = this.addRating;
    this.addCreatorArray = this.addCreator;

    console.log(this.listArray0);
    if(this.newListName.length == 0) {
      alert('List Name cannot be empty');
    }
    else if (this.listArray0.length == 0) {
      alert('Track IDs cannot be empty');
    }
    else if(this.trackListArray.length == 0) {
      alert('Track Titles cannot be empty');
    }
    else {
      this.trackService.createList(this.newListName, this.listArray0, this.listArray1,this.listArray2,this.trackListArray, this.addDesListArray, this.addCommentArray, this.addRatingArray, this.addCreatorArray);
    }
    
  }

  //update list issue(overwrites the original list values)
  updateList(){
      this.httpClient.put(`http://localhost:3000/api/put/${this.updateListName}`,{ "trackIDs0":this.updateNewIDs.split(','), "trackIDs1":this.updateNewIDs1.split(','), "trackIDs2":this.updateNewIDs2.split(','),
      "trackTitles": this.updateNewTitles.split(','), 
      "additionalDescriptions": this.updateNewDescriptions}).subscribe(
          res=>{
            
          }
        );
        
  }

  //Add comment and ratings to the list
  postCommentAndRatings() {
    if(confirm(`Are you sure you want to post the comment and ratings?`)) {
      this.httpClient.put(`http://localhost:3000/api/put/${this.commentListName}`,{"comment":this.addComment, "rating":this.addRating}).subscribe(
        res=>{
          
        }
      );
    }
    
  }

  deleteList(){
        if(confirm(`Are you sure you want to delete list ${this.deleteListName}`)) {
          this.httpClient.delete(`http://localhost:3000/api/delete/${this.deleteListName}`).subscribe(
            req=>{
            }
          )
        }
  }

  //Choose a list name and delete track ids and names
  deleteTracksIDs() {
    this.httpClient.delete(`http://localhost:3000/api/delete/${this.deleteIDs}`).subscribe(
            req=>{
            }
          );
  }



  trackByID(){
    for(var i=0; i< this.lists.length; i++){
          for(var j=0; j< this.lists[i].trackIDs0.length; j++){
            this.httpClient.get(`http://localhost:3000/api/trackID/${(this.lists[i].trackIDs0)[j]}`).subscribe(
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

  // expandOrCollapseRow(listIndex: number): void {
  //   const playList = this.newListName[listIndex];

  //   this.newListName = this.newListName.map(list => {
  //     ...list, expaned: false;
  //   });
  // }






}





