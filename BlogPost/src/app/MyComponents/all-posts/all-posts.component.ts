import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { IPost } from '../../models/posts.model';
import { ICategory } from '../../models/category.model';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrl: './all-posts.component.css'
})
export class AllPostsComponent implements OnInit {
  posts: IPost[] = [];
  categories: ICategory[] = [];
  searchText: any = "";
  activeCategory: number | 'all' = 'all';
  filteredPostsByCategory: IPost[] = [];
  isCategoryFilteringLoading = false;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.loadPosts();
    this.loadCategories();
    this.subscribeToFilteredPosts();
  }

  loadPosts(): void {
    this.postService.getAllPosts().subscribe((posts) => {
      this.posts = posts;
      this.filteredPostsByCategory = [...this.posts];
    });
  }

  loadCategories(): void {
    this.postService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  subscribeToFilteredPosts(): void {
    this.postService.filteredPostBySearch$.subscribe((filteredPosts) => {
      this.filteredPostsByCategory = filteredPosts;
    });
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.categoryName : 'Unknown';
  }


  // Filter posts by category
  filterByCategory(categoryId: number | 'all'): void {
    this.isCategoryFilteringLoading = true;
    setTimeout(()=>{
      if (categoryId === 'all') {
        this.filteredPostsByCategory = this.posts;
      } else {
        this.filteredPostsByCategory = this.posts.filter(post => post.categoryId === categoryId);
      }
      this.activeCategory = categoryId;
      this.isCategoryFilteringLoading = false;
      console.log("active category", this.activeCategory);
    },500)
  }


  //  filterByCategory(category: string): void {
  //   if (category === 'all') {
  //     this.filteredPostsByCategory = [...this.posts];  
  //   } else {
  //     this.filteredPostsByCategory = this.posts.filter(post => post.categoryId === 1);
  //   }
  //   this.activeCategory = category
  // }

  onSearch(): void {
    this.postService.searchPost(this.searchText);
    // console.log(this.searchText);
  }
}
