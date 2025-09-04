import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';   // service pour appeler le backend
import { AuthService } from '../../services/auth.service'; // service pour stocker token
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loading = false;
  errorMsg = '';

  // Formulaire normal (pas de nonNullable)
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    mot_de_passe: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) {}

  get f() {
    return this.form.controls;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    // Forcer les valeurs à string pour TypeScript
    const payload = {
      email: this.form.value.email ?? '',
      mot_de_passe: this.form.value.mot_de_passe ?? ''
    };

    this.api.login(payload).subscribe({
      next: (res) => {
        // Stocker tokens
        this.auth.saveToken(res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);

        // Rediriger vers dashboard
        this.router.navigateByUrl('/dashboard');
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = err?.error?.error || 'Identifiants incorrects';
        this.loading = false;
      },
    });
  }
}
