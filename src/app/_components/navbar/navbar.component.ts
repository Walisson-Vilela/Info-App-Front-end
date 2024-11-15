import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa o Router

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { } // Injeta o Router

  ngOnInit(): void {
    console.log("O navbar inicializou");
  }

  // Método para redirecionar ao clicar no ícone de logout
  onLogout(): void {
    this.router.navigate(['/login']); // Navega para a página de login
  }
}
