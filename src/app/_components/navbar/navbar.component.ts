import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa o Router

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username: string = ''; // Variável para armazenar o nome do usuário

  constructor(private router: Router) { } // Injeta o Router

  ngOnInit(): void {
    console.log("O navbar inicializou");

    // Tenta recuperar o nome do usuário do localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.username = storedUsername; // Define o nome do usuário, se encontrado
    }
  }

  // Método para redirecionar ao clicar no ícone de logout
  onLogout(): void {
    // Remover o token e o nome do usuário do localStorage ao fazer logout
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');

    // Redireciona para a página de login
    this.router.navigate(['']); // Navega para a página de login
  }
}
