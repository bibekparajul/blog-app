import { Component } from '@angular/core';
import { IPost } from '../../models/posts.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userPosts: IPost[] = [];

  currentUser: any;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    const loggedInUsername = localStorage.getItem('userName');

    if (loggedInUsername) {
      this.currentUser = {
        username: loggedInUsername,
      };

      this.fetchAndFilterUserPosts(loggedInUsername);
    } else {
      console.log('No user logged in');

    }
  }

  fetchAndFilterUserPosts(username: string): void {
    this.postService.getAllPosts().subscribe((posts: IPost[]) => {
      this.userPosts = posts.filter(post => post.authorName === username);
    });
  }

  getPostCount(): number {
    return this.userPosts.length;
  }
}

