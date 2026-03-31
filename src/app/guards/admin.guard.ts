import { inject } from '@angular/core';
import { CanMatchFn, Route, UrlSegment } from '@angular/router';
import { RoleSelectionService } from '../services/role-selection.service';

const ensureRoleSelected = (service: RoleSelectionService) => service.role() ?? service.selectRole();

export const adminGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const roleService = inject(RoleSelectionService);
  const activeRole = ensureRoleSelected(roleService);

  console.log('[canMatch] Checking admin availability', {
    route: route.path,
    url: '/' + segments.map((s) => s.path).join('/'),
    activeRole,
  });

  return activeRole === 'admin';
};
