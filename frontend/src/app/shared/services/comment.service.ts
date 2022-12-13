import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CommentInterface } from 'src/app/components/comment/comment.interface';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  
 toggle : EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor() { }


  }






















