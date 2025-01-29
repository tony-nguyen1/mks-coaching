import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';

export const StrongPasswordRegx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

@Component({
  selector: 'app-authentification',
  standalone: true,
  imports: [
    ReactiveFormsModule, // Import du module nécessaire pour les formulaires réactifs
    CommonModule,
  ],
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.css'
})
export class AuthentificationComponent {

  private formBuilder = inject(FormBuilder);

  profileForm: FormGroup = this.formBuilder.group({
    password: ['', [Validators.required, Validators.pattern(StrongPasswordRegx)]],
    email: ['', [Validators.required, Validators.email]]
  });

  get password() { return this.profileForm.get('password'); }
  get email() { return this.profileForm.get('email'); }


  onSubmit(): void {
    console.log("Click")
  }

  handleSubmit() {
    alert(
      this.profileForm.value.name + ' | ' + this.profileForm.value.email
    );
  }
}
