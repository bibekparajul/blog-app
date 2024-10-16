import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthservicesService } from '../../services/authservices.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  username: string | null ='';

  constructor(private router: Router, private authService: AuthservicesService){
  }
  ngOnInit(): void {
    this.username = this.authService.getUsername();
  }


  // logout(){
  //   console.log("Log out clicked")
  //   this.router.navigate([""]);
  // }

  logout(){
    this.authService.logout();
    this.router.navigate([""]);
  }

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

}
