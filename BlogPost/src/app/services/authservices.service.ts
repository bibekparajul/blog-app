import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginDTO, LoginResponseDTO, RegisterDTO } from '../models/loginRegister.model';

@Injectable({
  providedIn: 'root'
})
export class AuthservicesService {

  constructor(private http: HttpClient) {
   }

  private baseUrl = "https://localhost:7046/api/Account";

  register(user: RegisterDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/RegisterUser`, user);
  }

  login(credentials: LoginDTO): Observable<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(`${this.baseUrl}/Login`, credentials).pipe(
      tap((response: LoginResponseDTO) => {
        if (response.data.token) {
           localStorage.setItem('authToken', response.data.token);
          localStorage.setItem('userName',response.data.userName)          
        }
      })
    );
  }
  
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
  }
  
  getUsername(): string | null{
    return localStorage.getItem('userName');
  }
  
  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
