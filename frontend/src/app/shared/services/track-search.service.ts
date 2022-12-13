import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrackSearchService {
  
  constructor(public httpClient: HttpClient) {}
  
   trackByID: any=[];

   inputValue: any = [];


  getTrack(enteredValue: string, enteredValue2:string, enteredValue3:string): Observable<any>  {

    this.inputValue= [];

  if(enteredValue=='' && enteredValue2 == '' && enteredValue3 == '')
     {   return this.inputValue ; }
 else if(enteredValue3 == ''){
  if(enteredValue2 == '')  
    return this.httpClient.get(`http://localhost:3000/api/artist/${enteredValue}`);
  else if(enteredValue=='')
    return this.httpClient.get(`http://localhost:3000/api/track/${enteredValue2}`);
          else{
      this.httpClient.get(`http://localhost:3000/api/artist/${enteredValue}`).subscribe(
        (res: any)=>{
          this.httpClient.get(`http://localhost:3000/api/track/${enteredValue2}`).subscribe(
            (response: any)=>{
                for(var i =0; i<res.length; i++){
                  for(var j=0; j<response.length; j++ ){
                    if(response[j].album_title==res[i].album_title && response[j].artist_name == res[i].artist_name)
                    this.inputValue.push(res[i]);
                    
                  }
                  
                }
            }
          )
        }
      )
    }
  } else if(enteredValue == ''){
    if(enteredValue2 == '')  
      return this.httpClient.get(`http://localhost:3000/api/trackNumber/${enteredValue3}`);
    else if(enteredValue3=='')
      return this.httpClient.get(`http://localhost:3000/api/track/${enteredValue2}`);
            else{
        this.httpClient.get(`http://localhost:3000/api/track/${enteredValue2}`).subscribe(
          (res: any)=>{
            this.httpClient.get(`http://localhost:3000/api/trackNumber/${enteredValue3}`).subscribe(
              (response: any)=>{
                  for(var i =0; i<res.length; i++){
                    for(var j=0; j<response.length; j++ ){
                      if(response[j].album_title==res[i].album_title && response[j].track_title == res[i].track_title)
                      this.inputValue.push(res[i]);
                    }
                    
                  }
              }
            )
          }
        )
      }
    }else if(enteredValue2 == ''){
      if(enteredValue == '')  
        return this.httpClient.get(`http://localhost:3000/api/trackNumber/${enteredValue3}`);
      else if(enteredValue3=='')
        return this.httpClient.get(`http://localhost:3000/api/artist/${enteredValue}`);
              else{
          this.httpClient.get(`http://localhost:3000/api/artist/${enteredValue}`).subscribe(
            (res: any)=>{
              this.httpClient.get(`http://localhost:3000/api/trackNumber/${enteredValue3}`).subscribe(
                (response: any)=>{
                    for(var i =0; i<res.length; i++){
                      for(var j=0; j<response.length; j++ ){
                        if(response[j].artist_name==res[i].artist_name && response[j].track_title == res[i].track_title)
                        this.inputValue.push(res[i]);
                      }
                      
                    }
                }
              )
            }
          )
        }
      }else{
        this.httpClient.get(`http://localhost:3000/api/artist/${enteredValue}`).subscribe(
          (res: any)=>{
            this.httpClient.get(`http://localhost:3000/api/trackNumber/${enteredValue3}`).subscribe(
              (response: any)=>{
                this.httpClient.get(`http://localhost:3000/api/track/${enteredValue2}`).subscribe(
                  (r: any) =>{
                    for(var i =0; i<res.length; i++){
                      for(var j=0; j<response.length; j++ ){
                        for(var k=0; k<r.length; k++){
                          if(response[j].artist_name==res[i].artist_name && response[j].track_title == res[i].track_title&&  response[j].album_title == res[i].album_title &&response[j].artist_name==r[k].artist_name && response[j].album_title==r[k].album_title && response[j].track_title==r[k].track_title && res[i].track_title==r[k].track_title && res[i].album_title==r[k].album_title && res[i].artist_name==r[k].artist_name )
                        {this.inputValue.push(res[i]);
                        console.log('success');
                      }
                        }
                      }
                      
                    }
                  }
                )
                  
              }
            )
          }
        )
      }









    return of(this.inputValue);

    
  }

  createList(name:string,id0: string,id1: string,id2: string, title: string, addDes: string, comment: string, rating: number, creator: string){
    this.httpClient.post(`http://localhost:3000/api/post/20newlist`, { "name": name,"trackIDs0":id0, "trackIDs1":id1,"trackIDs2":id2, "trackTitles": title, "additionalDescriptions": addDes, "comment": comment, "rating": rating, "creator": creator }).subscribe(
     res=>{
       
     }
               
    )
    
}



  showList(): Observable <any>
  {
    return this.httpClient.get(`http://localhost:3000/api/listName`);
  }

  


}
