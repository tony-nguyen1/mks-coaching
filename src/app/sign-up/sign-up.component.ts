import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { DocumentReference, Timestamp } from "firebase/firestore";
import { UserService } from "../user.service";
import { MyUser } from "../my-user.model";
import { AuthentificationService } from "../authentification.service";
import { UserCredential } from "firebase/auth";

export const StrongPasswordRegx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

@Component({
  selector: "app-sign-up",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./sign-up.component.html",
  styleUrl: "./sign-up.component.css",
})
export class SignUpComponent {
  public inscriptionForm: FormGroup;
  etape: number = 1; // 1 pour la première étape, 2 pour la deuxième étape

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthentificationService,
  ) {
    this.inscriptionForm = this.fb.group({
      // Étape 1
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [Validators.required, Validators.pattern(StrongPasswordRegx)],
      ],

      // Étape 2
      nom: ["", Validators.required],
      prenom: ["", Validators.required],
      age: [18, [Validators.required, Validators.min(18)]],
      poids: [30, [Validators.required, Validators.min(30)]],
      pseudo: ["", Validators.required],
    });
  }

  // Passer à l'étape suivante
  suivant() {
    if (
      this.etape === 1 &&
      this.inscriptionForm.get("email")?.valid &&
      this.inscriptionForm?.get("password")?.valid
    ) {
      this.etape = 2;
    }
  }

  async soumettre() {
    if (this.inscriptionForm.valid) {
      const aUser: MyUser = new MyUser(
        "",
        this.inscriptionForm.value.nom,
        this.inscriptionForm.value.prenom,
        this.inscriptionForm.value.email,
        this.inscriptionForm.value.age,
        Timestamp.now(),
        [
          {
            unPoid: this.inscriptionForm.value.poids,
            createdAt: Timestamp.now(),
          },
        ],
        "client",
      );

      // TODO:
      // add logs
      await this.authService
        .signUp(
          this.inscriptionForm.value.email,
          this.inscriptionForm.value.password,
        )
        .then(
          async (value: UserCredential) => {
            await this.foo(aUser);
          },
          (reason: any) => {
            throw new Error(
              "Something went wrong while signing up a new user.",
            );
          },
        );
      //
    } else {
      console.error("Formulaire invalide");
    }
  }

  private async foo(aUser: MyUser) {
    await this.userService
      .createUser(aUser)
      .then((d: DocumentReference) => {
        console.log(
          "Document écrit avec ID :",
          d.id,
          " ts :",
          aUser.createdAt.toDate().toString(),
        );
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du document :", error);
      });
    console.log("Après écriture du Document");
  }
}
