export interface LoginRequest {
  email: string;
  senha: string;
}

export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  usuario: UsuarioInfo;
}

export interface UsuarioInfo {
  id: string;
  nome: string;
  email: string;
  role: string;
}
