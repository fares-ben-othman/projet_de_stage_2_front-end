import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService, RegisterDto } from '../../services/api.service';
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

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mot_de_passe: ['', [Validators.required, Validators.minLength(8)]],
      agence_id: [1, Validators.required]  // valeur par défaut pour l'exemple
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

    const payload: RegisterDto = this.registerForm.value;

    this.api.register(payload).subscribe({
      next: (res) => {
        this.successMsg = 'Compte créé avec succès !';
        this.loading = false;
        this.registerForm.reset();
        this.router.navigateByUrl('/login'); // redirige vers login après succès
      },
      error: (err) => {
        this.errorMsg = err?.error?.error || 'Erreur lors de l’inscription';
        this.loading = false;
      }
    });
  }
}
