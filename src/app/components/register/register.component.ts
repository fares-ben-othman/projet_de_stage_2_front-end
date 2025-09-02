import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mot_de_passe: ['', Validators.required],
      agence_id: [0, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Form Data:', this.registerForm.value);
      alert('Form submitted! Check the console for data.');
    } else {
      alert('Please fill all required fields.');
    }
  }
}
