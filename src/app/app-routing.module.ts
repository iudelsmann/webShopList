import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AlreadySignedInGuard } from './guards/already-signed-in.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { page: 'home' }, canActivate: [AuthGuard] },
  { path: 'list/:listId', component: ListComponent, data: { page: 'list' } },
  { path: 'login', component: LoginComponent, data: { page: 'login' }, canActivate: [AlreadySignedInGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
