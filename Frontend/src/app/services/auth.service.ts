import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthResponse, LoginRequest, RegisterRequest, UsuarioInfo } from '../models/auth.models';

const TOKEN_KEY = 'raiox_access_token';
const USER_KEY  = 'raiox_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = 'http://localhost:8080/api/v1/auth';

  readonly currentUser = signal<UsuarioInfo | null>(this.loadUser());

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {}

  login(req: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, req).pipe(
      tap(r => this.saveSession(r)),
    );
  }

  registar(req: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/registar`, req).pipe(
      tap(r => this.saveSession(r)),
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private saveSession(resp: AuthResponse): void {
    localStorage.setItem(TOKEN_KEY, resp.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(resp.usuario));
    this.currentUser.set(resp.usuario);
  }

  private loadUser(): UsuarioInfo | null {
    const s = localStorage.getItem(USER_KEY);
    return s ? JSON.parse(s) : null;
  }
}
