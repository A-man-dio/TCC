import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'registar',
    loadComponent: () =>
      import('./components/auth/register/register.component').then(m => m.RegisterComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./components/shell/shell.component').then(m => m.ShellComponent),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '' },
];
