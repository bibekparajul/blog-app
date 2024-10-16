import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
// export class CreatePostComponent {

//   constructor(private postServive: PostService, private router: Router) {
//   }

//   createPostForm = new FormGroup({
//     title: new FormControl("", [Validators.minLength(3), Validators.required]),
//     description: new FormControl("", [Validators.minLength(3), Validators.required]),
//     image: new FormControl(""),
//     category: new FormControl("")

//   });

//   onSubmit(event: Event) {
//     event.preventDefault();
//     if (this.createPostForm.valid) {
//       this.postServive.createPost(
//         this.createPostForm.get('title')?.value!,
//         this.createPostForm.get('image')?.value!,
//         this.createPostForm.get('description')?.value!,
//         this.createPostForm.get('category')?.value!
//       );
//       this.router.navigate(['/all-posts']);
//       console.log(this.createPostForm.controls.title.value!,
//         this.createPostForm.controls.description.value!);
//     }
//     else{
//       console.log("Form is invalid");
//     }
//   }

//   onCreatePost(): void {
//     if (this.createPostForm.valid) {
//       const newPost = this.createPostForm.value;
//       console.log(newPost);
//     }
//   }
// }

export class CreatePostComponent implements OnInit {
  categories: any[] = []; // To store categories fetched from the API
  isCreating = false;
  selectedFile: File | null = null;
  constructor(private postService: PostService, private router: Router) { }

  // Form initialization with validation rules
  createPostForm = new FormGroup({
    title: new FormControl('', [Validators.minLength(3), Validators.required]),
    description: new FormControl('', [Validators.minLength(3), Validators.required]),
    image: new FormControl('',), 
    category: new FormControl('', Validators.required) 
  });

  ngOnInit(): void {
    this.postService.getCategories().subscribe(
      (categories: any[]) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

    // Handle file input change event
    onFileSelected(event: Event): void {
      const fileInput = event.target as HTMLInputElement;
      if (fileInput.files && fileInput.files.length > 0) {
        this.selectedFile = fileInput.files[0];
      }
    }

  // Handle form submission
  onFormSubmit(event: Event): void {
    event.preventDefault();

    this.createPostForm.markAllAsTouched();

    if (this.createPostForm.valid) {
      this.isCreating = true;
      const formData = new FormData();

      // Append the form fields to FormData
      formData.append('title', this.createPostForm.controls['title'].value!);
      formData.append('description', this.createPostForm.controls['description'].value!);
      formData.append('categoryId', this.createPostForm.controls['category'].value!);

    const authorName = localStorage.getItem('userName');
    if (authorName) {
      formData.append('authorName', authorName);
    }

      // If the user selected an image, append the file to FormData
      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }

      this.postService.createPost(formData).subscribe(
        () => {
          setTimeout(()=>{
            this.isCreating = false;
            this.router.navigate(['/all-posts']);
          },500)
        },
        (error) => {
          console.error('Error creating post:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}

  // Method to handle form submission
  // onSubmit(event: Event): void {
  //   event.preventDefault();
  //   if (this.createPostForm.valid) {
  //     // Create the post object from the form values
  //     const newPost = {
  //       title: this.createPostForm.get('title')?.value!,
  //       description: this.createPostForm.get('description')?.value!,
  //       image: this.createPostForm.get('image')?.value!,
  //       categoryId: Number(this.createPostForm.get('category')?.value!) || 0 // Assuming categoryId is passed
  //     };

  //     const { categoryId, description, image, title } = newPost;

  //     // Call the PostService to create the post
  //     this.postService.createPost(title, description, image, categoryId).subscribe(
  //       (response) => {
  //         console.log('Post created successfully:', response);
  //         // Navigate to 'all-posts' page after successful post creation
  //         this.router.navigate(['/all-posts']);
  //         console.log()
  //       },
  //       (error) => {
  //         console.error('Error creating post:', error);
  //       }
  //     );
  //   } else {
  //     console.log('Form is invalid');
  //   }
  // }

