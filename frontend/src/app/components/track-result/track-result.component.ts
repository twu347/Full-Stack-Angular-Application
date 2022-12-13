import { Component, Injectable, OnInit } from '@angular/core';
import { MainPageComponent } from '../main-page/main-page.component';
import { TrackSearchService } from 'src/app/shared/services/track-search.service';

@Injectable({
  providedIn:'root'
})

@Component({
  selector: 'app-track-result',
  templateUrl: './track-result.component.html',
  styleUrls: ['./track-result.component.css']
})
export class TrackResultComponent implements OnInit{
  tracks: any[] = [1,2,3,4,5];   


constructor(){}

ngOnInit(): void {
  
    }
  getValue(value:any[]){
    this.tracks = value;
  }
  
}







