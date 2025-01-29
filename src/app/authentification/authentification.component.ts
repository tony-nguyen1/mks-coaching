import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { FIREBASE_CONFIG } from '../environment';

export const StrongPasswordRegx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// Initialize Firebase
const app = initializeApp(FIREBASE_CONFIG);

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

  constructor(private router: Router) { }
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
    this.connect(this.profileForm.value.email, this.profileForm.value.password);
  }

  connect(email: string, password: string) {
    console.log("Service connect")
    const auth = getAuth();

    signInWithEmailAndPassword
      // createUserWithEmailAndPassword
      (auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        // console.log(user);
        console.log(user.email);
        console.log(user.displayName);
        console.log(user.phoneNumber);
        console.log(user.metadata.creationTime);
        console.log(user.metadata.lastSignInTime);

        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorCode);
        console.log(errorMessage);
      });
  }
}
