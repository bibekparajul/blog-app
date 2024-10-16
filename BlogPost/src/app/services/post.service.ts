import { Injectable } from '@angular/core';
import { IPost } from '../models/posts.model';
import { Observable, Subject } from 'rxjs';
import { CommentService } from './comment.service';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = 'https://localhost:7046/api';

  private filteredPostSubject = new Subject<IPost[]>();
  filteredPostBySearch$ = this.filteredPostSubject.asObservable();

  constructor(private commentService: CommentService, private http: HttpClient) {

  }

  // Get all categories
  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.baseUrl}/category`);
  }

  // Get all the posts 
  getAllPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.baseUrl + "/posts");
  }

  // Create a new post with FormData
  createPost(formData: FormData): Observable<void> {
    const authorName = localStorage.getItem('userName');
    if (authorName) {
      formData.append('authorName', authorName);
    }
    return this.http.post<void>(`${this.baseUrl}/posts`, formData);
  }


  // Getting the individual posts from the posts data
  getIndividualPost(id: number) {
    return this.http.get<IPost>(this.baseUrl + "/posts/" + id);
  }

  // Deleting the posts
  deletePost(id: number) {
    return this.http.delete<void>(this.baseUrl + "/posts/" + id);
  }

  // Update post
  editPost(postId: number, title: string, description: string, image: string, categoryId: number) {
    const payload = {
      postId, title, description, image, categoryId
    }
    return this.http.put<IPost>(this.baseUrl + "/posts/" + postId, payload)
  }

  searchPost(val: string) {
    this.http.get<IPost[]>(this.baseUrl + "/posts").subscribe((posts) => {
      const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(val.toLowerCase())
      );
      this.filteredPostSubject.next(filtered);
    });
  }
}

