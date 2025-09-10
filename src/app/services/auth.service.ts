import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'carsential_token';
  private refreshTokenKey = 'carsential_refresh';

  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  saveRefreshToken(token: string) {
    localStorage.setItem(this.refreshTokenKey, token);
  }

  saveTokens(accessToken: string, refreshToken: string) {
    this.saveToken(accessToken);
    this.saveRefreshToken(refreshToken);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }
}
