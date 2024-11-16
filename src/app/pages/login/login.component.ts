import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  login() {
    const userData = {
      username: this.username,
      password: this.password
    };

    // Envia a requisição de login para o backend
    this.http
      .post<any>('http://localhost:3000/login', userData)
      .subscribe(
        (response) => {
          // Armazena o token e o nome do usuário no localStorage
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('username', userData.username); // Salva o nome do usuário

          // Navega para a página Home
          this.router.navigate(['/home']);
        },
        (error) => {
          alert('Credenciais inválidas');
        }
      );
  }


}
