import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService, LoginDto, AuthResponse } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      mot_de_passe: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.errorMsg = 'Veuillez remplir tous les champs correctement.';
      return;
    }

    this.loading = true;

    this.api.login(this.form.value as LoginDto).subscribe({
      next: (res: AuthResponse) => {
        // 🔹 Si le backend renvoie de vrais tokens
        if (res && res.accessToken && res.refreshToken) {
          this.auth.saveTokens(res.accessToken, res.refreshToken);
        } else {
          // 🔹 Sinon (mode démo / sans backend)
          this.auth.saveTokens('fake-access-token', 'fake-refresh-token');
        }

        this.loading = false;
        this.router.navigate(['/dashboard']); // redirection après login
      },
      error: (err) => {
        // 🔹 En cas d'erreur API → utiliser aussi des tokens fake pour tester
        this.auth.saveTokens('fake-access-token', 'fake-refresh-token');
        this.loading = false;
        this.router.navigate(['/dashboard']); // accès dashboard même sans backend

        // ⚠️ Tu peux enlever ces 3 lignes ci-dessus si tu veux bloquer l’accès en cas d’erreur
        this.errorMsg = err?.error?.message || 'Erreur lors de la connexion';
      }
    });
  }
}
