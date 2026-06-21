import { Component, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';

function passwordsMatch(g: AbstractControl): ValidationErrors | null {
  const senha    = g.get('senha')?.value;
  const confirma = g.get('confirma')?.value;
  return senha && confirma && senha !== confirma ? { passwordMismatch: true } : null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  form = new FormGroup(
    {
      nome:     new FormControl('', [Validators.required, Validators.minLength(3)]),
      email:    new FormControl('', [Validators.required, Validators.email]),
      senha:    new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirma: new FormControl('', Validators.required),
    },
    { validators: passwordsMatch },
  );

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

    this.authService.registar({
      nome:  this.form.value.nome!,
      email: this.form.value.email!,
      senha: this.form.value.senha!,
    }).subscribe({
      next: () => this.router.navigate(['/']),
      error: err => {
        this.isLoading.set(false);
        if (err.status === 409) {
          this.error.set('Este email já está registado.');
        } else if (err.status === 0) {
          this.error.set('Servidor inacessível. Verifique se o backend está activo.');
        } else {
          this.error.set('Erro inesperado. Tente novamente.');
        }
      },
    });
  }
}
