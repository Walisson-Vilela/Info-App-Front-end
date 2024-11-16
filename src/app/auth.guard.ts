import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Verifica se o token está presente no localStorage
    const token = localStorage.getItem('authToken');

    if (token) {
      // Se o token existir, permite o acesso à rota
      return true;
    } else {
      // Se não houver token, redireciona para a página de login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
