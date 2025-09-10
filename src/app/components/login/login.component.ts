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
  form!: FormGroup;  // <-- correspond à ton HTML
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

  submit(): void {  // <-- correspond à ton HTML
    if (this.form.invalid) {
      this.errorMsg = 'Veuillez remplir tous les champs correctement.';
      return;
    }

    this.loading = true;
    this.api.login(this.form.value as LoginDto).subscribe({
      next: (res: AuthResponse) => {
        this.auth.saveToken(res.accessToken);  // <-- sauvegarde le token
        this.loading = false;
        this.router.navigateByUrl('/dashboard'); // redirection après login
      },
      error: (err) => {
        this.errorMsg = err?.error?.message || 'Erreur lors de la connexion';
        this.loading = false;
      }
    });
  }
}
