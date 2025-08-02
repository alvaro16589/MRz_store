import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { VariablesService } from '../services/variables/variables.service';
import { effect, inject } from '@angular/core';

export const rolUserGuard: CanActivateFn = (route, state) => {
  const variableService = inject(VariablesService);
  const router = inject(Router);
  return (variableService.userLogged().rol === 'root') ? true : router.createUrlTree(['home/todos']);
};
export const userInterfaceLoginGuard: CanActivateFn = (route, state) => {
  const variableService = inject(VariablesService);
  const router = inject(Router);
  return (variableService.userLogged().id === -1) ? true : router.createUrlTree(['home/todos']);
};