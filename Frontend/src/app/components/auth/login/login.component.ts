import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  isLoading = signal(false);
  error     = signal<string | null>(null);
  showPass  = signal(false);

  togglePass(): void { this.showPass.update(v => !v); }

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  submit(): void {
    if (this.form.invalid || this.isLoading()) return;

    this.isLoading.set(true);
    this.error.set(null);

    this.authService.login({
      email: this.form.value.email!,
      senha: this.form.value.senha!,
    }).subscribe({
      next: () => this.router.navigate(['/']),
      error: err => {
        this.isLoading.set(false);
        if (err.status === 401) {
          this.error.set('Email ou senha inválidos.');
        } else if (err.status === 0) {
          this.error.set('Servidor inacessível. Verifique se o backend está activo.');
        } else {
          this.error.set('Erro inesperado. Tente novamente.');
        }
      },
    });
  }
}
