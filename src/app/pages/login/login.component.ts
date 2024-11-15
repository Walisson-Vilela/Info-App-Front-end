import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Importando o Router corretamente

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],  // Corrigido o nome para styleUrls
})
export class LoginComponent {
  constructor(private router: Router) {}  // Injetando o Router corretamente

  login() {
    this.router.navigate(['/home']);  // Navega para a página home
  }
}
