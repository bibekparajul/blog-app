import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './MyComponents/login/login.component';
import { RegisterComponent } from './register/register.component';
import { AllPostsComponent } from './MyComponents/all-posts/all-posts.component';
import { IndividualPostComponent } from './MyComponents/individual-post/individual-post.component';
import { CreatePostComponent } from './MyComponents/create-post/create-post.component';
import { ProfileComponent } from './MyComponents/profile/profile.component';
import { DeleteConfirmationComponent } from './shared/delete-confirmation/delete-confirmation.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'all-posts',
    component: AllPostsComponent,
    canActivate:[authGuard]
  },
  {
    path: "post/:id",
    component: IndividualPostComponent,
    canActivate:[authGuard]

  },
  {
    path: 'create-post',
    component: CreatePostComponent,
    canActivate:[authGuard]

  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate:[authGuard]

  },
  {
    path: 'delete-confirmation',
    component: DeleteConfirmationComponent,
    canActivate:[authGuard]

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
