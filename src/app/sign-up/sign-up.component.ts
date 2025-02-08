import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { DocumentReference, Timestamp } from "firebase/firestore";
import { User, UserService } from "../user.service";

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
    userService: UserService,
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
      // let v = {
      //   email: this.inscriptionForm.value.email,
      //   // password: this.inscriptionForm.value.password, // BAD !!!
      //   nom: this.inscriptionForm.value.nom,
      //   prenom: this.inscriptionForm.value.prenom,
      //   age: this.inscriptionForm.value.age,
      //   poids: [{ unPoid: this.inscriptionForm.value.poids, createdAt: Timestamp.now() }],
      //   pseudo: this.inscriptionForm.value.pseudo,
      //   createdAt: Timestamp.now(), // Ajouter un champ timestamp pour la date de création
      //   role: "client" // "admin" ; "max" ;
      // };
      const aUser: User = new User(
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
      // create a User account
      await UserService.createUser(aUser)
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
    } else {
      console.error("Formulaire invalide");
    }
  }
}
