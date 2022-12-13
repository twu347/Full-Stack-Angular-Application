import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/shared/services/comment.service';
import { CommentInterface } from './comment.interface';
import {Observable} from "rxjs";
import { FlatTreeControl } from '@angular/cdk/tree';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})

export class CommentComponent implements OnInit {
  isCommentInEditMode = false;

  @Input() comment!: Comment;
  @Input() index!: number;
  @Input() comments!: CommentInterface[];
 
  editComment(): void {
    this.isCommentInEditMode = true;
  }

  deleteComment(): void {
    this.comments = this.comments.splice(this.index, 1);
  }

  disableCommentEditMode(isEditMode: boolean) {

  }
  

  ngOnInit(): void {
    
  }
  
}
