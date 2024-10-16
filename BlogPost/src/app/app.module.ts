import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './MyComponents/login/login.component';
import { AllPostsComponent } from './MyComponents/all-posts/all-posts.component';
import { IndividualPostComponent } from './MyComponents/individual-post/individual-post.component';
import { CreatePostComponent } from './MyComponents/create-post/create-post.component';
import { CommentComponent } from './MyComponents/comment/comment.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './MyComponents/navbar/navbar.component';
import { FeaturedPostComponent } from './MyComponents/featured-post/featured-post.component';
import { ProfileComponent } from './MyComponents/profile/profile.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DeleteConfirmationComponent } from './shared/delete-confirmation/delete-confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AllPostsComponent,
    IndividualPostComponent,
    CreatePostComponent,
    CommentComponent,
    RegisterComponent,
    NavbarComponent,
    FeaturedPostComponent,
    ProfileComponent,
    DeleteConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
