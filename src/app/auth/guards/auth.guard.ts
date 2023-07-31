import {
  CanActivateFn,
  CanMatchFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Route,
  Router,
  UrlSegment,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

const checkAuthStatus = (): boolean | Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  return authService.checkAuthentication().pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) router.navigate(['./auth/login']);
    })
  );
};

export const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | Observable<boolean> => {
  return checkAuthStatus();
};

export const canMatch: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
): boolean | Observable<boolean> => {
  return checkAuthStatus();
};
