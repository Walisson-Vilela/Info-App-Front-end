import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth.guard'; // Importa o AuthGuard

const routes: Routes = [
  { path: '', component: LoginComponent }, // Rota de login
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }, // Protege a rota Home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
