import { inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { Routes } from '../models/routes-model';
import { map, take } from 'rxjs';

export const guestGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  console.log('[Guard] Evaluating navigation attempt', {
    path: route.routeConfig?.path,
    url: state.url,
    params: route.params,
  });

  return authState(auth).pipe(
    take(1),
    map(user => {
      if (user) {
        return router.createUrlTree([Routes.home]);
      } else {
        return true;
      }
    })
  )
};