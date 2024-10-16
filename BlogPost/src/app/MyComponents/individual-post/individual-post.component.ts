import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IPost } from '../../models/posts.model';
import { CommentService } from '../../services/comment.service';
import { IComment } from '../../models/comment.model';
import { ICategory } from '../../models/category.model';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-individual-post',
  templateUrl: './individual-post.component.html',
  styleUrl: './individual-post.component.css'
})
export class IndividualPostComponent implements OnInit {
  constructor(private postService: PostService, private routeService: ActivatedRoute, 
    private router: Router, private commentService: CommentService) {
  }
  post: IPost | undefined;
  id: number | undefined;
  newCommentContent: string = '';
  categories: ICategory[] = [];
  isDeleteModalOpen = false; 
  isDeleting = false;
  comments: IComment[] | undefined;
  loggedInUserName: string | null = null;

  title = new FormControl("");
  description = new FormControl("");
  category = new FormControl();

  editPostForm = new FormGroup({
    title: this.title,
    description: this.description,
    category:this.category
  })


  ngOnInit(): void {
    this.loggedInUserName = localStorage.getItem('userName');
    this.id = Number(this.routeService.snapshot.params["id"]);

    this.postService.getIndividualPost(this.id).subscribe((post) => {
      this.post = post;
      this.commentService.getCommentsByPostId(this.id!);

    });
    this.commentService.comments$.subscribe((comments)=> {
      this.comments = comments;
    })

    this.postService.getCategories().subscribe((categories: ICategory[]) => {
      this.categories = categories;
    });
  
  }

  getCategoryName(categoryId: number | undefined): string {
    if (!categoryId) return 'Unknown';
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.categoryName : 'Unknown';
  }

  // Open the delete modal
  openDeleteModal(): void {
    this.isDeleteModalOpen = true;
  }

  // Deleting method
  onDelete(): void {
    this.isDeleting = true; 
  
    if (this.id) {
      this.postService.deletePost(this.id).subscribe(() => {
        setTimeout(() => {
          this.isDeleting = false; 
          this.router.navigate(['/all-posts']);
        }, 1000);
      });
    }
  }

  onEdit(){
    console.log("On edit clicked")
  }
  

  onCancelDelete():void{
    this.isDeleteModalOpen = false;
  }

  addComment(): void {
    if (this.post && this.newCommentContent.trim()) {
      const authorName = localStorage.getItem('userName') || 'Anonymous';

      const newComment: IComment = {
        // id: Date.now(),
        postId: this.post.postID,
        authorName: authorName,
        commentMessage: this.newCommentContent,
        createdAt : new Date(),
      };

      this.commentService.addComment(newComment);
      console.log(newComment, "comment here")

      this.post.comments?.push(newComment);
      this.newCommentContent = '';
    }
  }
  canDeletePost(): boolean {
    return this.loggedInUserName === this.post?.authorName;
  }
}


