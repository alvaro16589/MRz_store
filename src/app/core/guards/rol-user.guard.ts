import { CanActivateChildFn, CanActivateFn } from '@angular/router';
import { VariablesService } from '../services/variables/variables.service';
import { effect, inject } from '@angular/core';

export const rolUserGuard: CanActivateFn = (route, state) => {
  const variableService = inject(VariablesService);
  return (variableService.userLogged().rol === 'root')? true : false;
};
export const userInterfaceLoginGuard: CanActivateFn = (route, state) => {
  const variableService = inject(VariablesService);
  return (variableService.userLogged().id === -1) ? true : false;
};