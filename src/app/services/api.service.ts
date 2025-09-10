import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface RegisterDto {
  nom: string;
  email: string;
  mot_de_passe: string;
  agence_id?: number;
}

export interface LoginDto {
  email: string;
  mot_de_passe: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: any;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(payload: RegisterDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/register`, payload);
  }

  login(payload: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/users/login`, payload);
  }

  refreshToken(token: string): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(
      `${this.baseUrl}/auth/refresh`,
      { refreshToken: token }
    );
  }
}
