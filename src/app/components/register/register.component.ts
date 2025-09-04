import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';  // <- ajouter ApiService
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  errorMsg = '';
  successMsg = '';

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mot_de_passe: ['', [Validators.required, Validators.minLength(8)]],
      agence_id: [0]  // optionnel, pas de validation stricte
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.errorMsg = 'Please fill all required fields correctly.';
      return;
    }

    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';

    // Appel au backend
    this.api.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.successMsg = 'Compte créé avec succès !';
        this.loading = false;
        this.registerForm.reset();
        // Redirection vers login après succès (optionnel)
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        this.errorMsg = err?.error?.error || 'Erreur lors de l’inscription';
        this.loading = false;
      }
    });
  }
}
