import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  UrlSegment,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, map, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

const checkStatus = (): Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  return authService.checkAuthentication().pipe(
    tap((isAuthenticated) => {
      if (isAuthenticated) router.navigate(['./']);
    }),
    map((isAuthenticated) => !isAuthenticated)
  );
};

export const canActivateLoged: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  return checkStatus();
};

export const canMatchLoged: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
): Observable<boolean> => {
  return checkStatus();
};
