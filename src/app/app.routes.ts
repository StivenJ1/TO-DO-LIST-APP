import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'init',
    loadComponent: () => import('./features/carousel/carousel.component').then((m) => m.CarouselComponent),
  },
  {
    path: 'task',
    loadComponent: () => import('./features/task/task.component').then((m) => m.TaskComponent),
  },
  {
    path: 'category',
    loadComponent: () => import('./features/category/category.component').then((m) => m.CategoryComponent),
  },
  {
    path: '',
    redirectTo: 'init',
    pathMatch: 'full',
  },
];
