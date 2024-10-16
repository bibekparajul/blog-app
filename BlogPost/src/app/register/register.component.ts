import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthservicesService } from '../services/authservices.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userName: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthservicesService, private router: Router) {}

  register() {
    this.authService.register({ userName: this.userName, email: this.email, password: this.password })
      .subscribe(response => {
        // this.router.navigate(['/login']);
        alert("Registration successful")
        this.router.navigate(['']);
      }, error => {
        console.log(this.userName + this.email + this.password)
        alert('Registration failed');
      });
  }

}
