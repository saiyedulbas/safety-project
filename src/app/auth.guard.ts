import { CanActivateFn, Router } from '@angular/router';
import { MasterServiceService } from './services/master-service.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const masterService = inject(MasterServiceService);
  const router = inject(Router);

  if (masterService.checkForToken() != null) {
    return true;
  } else {
    router.navigate(['/generate-token']);  // Redirect to login page
    return false;
  }
};
