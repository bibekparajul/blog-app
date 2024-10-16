import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IComment } from '../models/comment.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = "https://localhost:7046/api/comments"

  private commentsSubject = new Subject<IComment[]>();
  comments$ = this.commentsSubject.asObservable();

  constructor(private http: HttpClient) { }
  // Fetch comments by postId
  getCommentsByPostId(postId: number) {
    this.http.get<IComment[]>(`${this.apiUrl}/post/${postId}`).subscribe(comments => {
      this.commentsSubject.next(comments);
    })
  }

  // Add a new comment
  addComment(comment: IComment) {
    this.http.post<IComment>(this.apiUrl, comment).subscribe(() => {
      this.getCommentsByPostId(comment.postId)
    })
  }
}
