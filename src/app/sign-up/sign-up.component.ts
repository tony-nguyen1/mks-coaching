import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Importez ReactiveFormsModule
import { CommonModule } from '@angular/common';

// Firestore
import { initializeApp } from "firebase/app";
import { DocumentReference, getFirestore } from "firebase/firestore";
import { Timestamp } from 'firebase/firestore';
import { collection, addDoc } from "firebase/firestore";
import { FIREBASE_CONFIG } from "../environment";
// Firestore


// Initialize Firebase
const app = initializeApp(FIREBASE_CONFIG);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})

export class SignUpComponent {
  public inscriptionForm: FormGroup;
  etape: number = 1; // 1 pour la première étape, 2 pour la deuxième étape


  constructor(private fb: FormBuilder) {
    this.inscriptionForm = this.fb.group({
      // Étape 1
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],

      // Étape 2
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      age: [18, [Validators.required, Validators.min(18)]],
      poids: [30, [Validators.required, Validators.min(30)]],
      pseudo: ['', Validators.required],
    });
  }

  // Passer à l'étape suivante
  suivant() {
    if (this.etape === 1 && this.inscriptionForm.get('email')?.valid && this.inscriptionForm?.get('password')?.valid) {
      this.etape = 2;
    }
  }

  // Soumettre le formulaire
  // soumettre() {
  //   if (true) { //this.inscriptionForm.valid) {
  //     console.log('Formulaire soumis', this.inscriptionForm.value);
  //     // Ici, vous pouvez envoyer les données à votre backend ou à Firebase
  //     try {
  //       const docRef = addDoc(collection(db, "user"), {
  //         first: "Ada",
  //         last: "Lovelace",
  //         born: 1815
  //       });
  //       console.log("Document written with ID: ", docRef);
  //     } catch (e) {
  //       console.error("Error adding document: ", e);
  //     }
  //   } else {
  //     console.error('Formulaire invalide');
  //   }
  // }
  async soumettre() {
    if (this.inscriptionForm.valid) {
      // Générer un timestamp comme ID du document
      const timestamp = Date.now().toString(); // ou utiliser `Timestamp.now().toMillis().toString()`

      const docRef = await addDoc(collection(db, "user"), {
        email: this.inscriptionForm.value.email,
        // password: this.inscriptionForm.value.password, // BAD !!!
        nom: this.inscriptionForm.value.nom,
        prenom: this.inscriptionForm.value.prenom,
        age: this.inscriptionForm.value.age,
        poids: [{ unPoid: this.inscriptionForm.value.poids, createdAt: Timestamp.now() }],
        pseudo: this.inscriptionForm.value.pseudo,
        createdAt: Timestamp.now(), // Ajouter un champ timestamp pour la date de création
        role: "client" // "admin" ; "max" ;  
      }).then((d: DocumentReference) => {

        console.log('Document écrit avec ID :', d.id, ' ts :', timestamp);
      }).catch(error => {
        console.error('Erreur lors de l\'ajout du document :', error);
      });
      console.log('Après écriture du Document');
    } else {
      console.error('Formulaire invalide');
    }
  }
}
