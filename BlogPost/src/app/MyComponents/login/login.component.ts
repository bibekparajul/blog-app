import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthservicesService } from '../../services/authservices.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // username: string | undefined;
  // password: string | undefined;

  // constructor(private router: Router){
  // }

  // onLogin(): void {
  //   if (this.username === 'admin' && this.password === 'admin') {
  //     this.router.navigate(['/all-posts']);
  //   } else {
  //     alert('Invalid username or password');
  //   }
  // }
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private authService: AuthservicesService, private router: Router) {}

  login() {
    this.authService.login({ email: this.email, password: this.password, rememberMe: this.rememberMe })
      .subscribe(response => {
        if (response) {
          console.log(response, "response")
          localStorage.setItem('authToken', response.data.token);

          console.log("login successful")
          this.router.navigate(['/all-posts']);
        }
      }, error => {
        alert('Login failed');
      });
  }

}
