import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthservicesService } from './services/authservices.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthservicesService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    // router.navigate(['/login']);
    router.navigate(['']);
    return false;
  }
};
