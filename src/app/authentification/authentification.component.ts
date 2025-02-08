import { Component, inject } from "@angular/core";
import { ReactiveFormsModule, FormControl, FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User as FirebaseUser,
} from "firebase/auth";

import { RouterModule } from "@angular/router";

import { FIREBASE_CONFIG } from "../environment";

export const StrongPasswordRegx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { UserService } from "../user.service";
import { AuthentificationService } from "../authentification.service";

const prefix: string = "AuthentificationComponent:";
@Component({
  selector: "app-authentification",
  standalone: true,
  imports: [
    ReactiveFormsModule, // Import du module nécessaire pour les formulaires réactifs
    CommonModule,
    RouterModule,
  ],
  templateUrl: "./authentification.component.html",
  styleUrl: "./authentification.component.css",
})
export class AuthentificationComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthentificationService);

  constructor(private router: Router) {}
  profileForm: FormGroup = this.formBuilder.group({
    // password: ['', [Validators.required, Validators.pattern(StrongPasswordRegx)]],
    password: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
  });

  get password() {
    return this.profileForm.get("password");
  }
  get email() {
    return this.profileForm.get("email");
  }

  onSubmit(): void {
    console.log("Click");
  }

  handleSubmit() {
    this.connect(this.profileForm.value.email, this.profileForm.value.password);
  }

  connect(email: string, password: string) {
    console.log(prefix, "connecting");
    let answer = this.authService.signIn(email, password);
    answer.then(
      (value: FirebaseUser) => {
        console.log(prefix, "connected successfully");
        console.log(prefix, "FirebaseUser=", value);
        UserService.getUserDocIdFromUID(value.uid).then(
          (aUser) => {
            console.log(prefix, `idDocument=${aUser.userId}`);
            if (aUser.role === "admin") {
              console.log(prefix, "redirecting to /dashboard");
              this.router.navigate(["/dashboard"]);
            } else if (aUser.role === "client") {
              console.log(prefix, "redirecting to /user");
              this.router.navigate(["/dashboard/user/", aUser.userId]);
            } else {
              throw new Error("role is supposed to be either admin or client");
            }
          },
          (reason) => {
            console.error(reason);
          },
        );
      },
      (reason) => {
        console.log("failed to sign in");
      },
    );
  }
}
