import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// Firestore
import { FirebaseApp, initializeApp } from "firebase/app";
import { DocumentReference, getFirestore, QuerySnapshot, QueryDocumentSnapshot, Firestore } from "firebase/firestore";
import { Timestamp } from 'firebase/firestore';
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { FIREBASE_CONFIG } from "../environment";
// Firestore

// Initialize Firebase
const app: FirebaseApp = initializeApp(FIREBASE_CONFIG);
// Initialize Cloud Firestore and get a reference to the service
const db: Firestore = getFirestore(app);

// const querySnapshot =
// await
// getDocs(collection(db, "user")).then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//     console.log(`${doc.id} => ${doc.data()}`);
//     console.log(doc.data());
//   });
// });


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  data: QueryDocumentSnapshot<DocumentData, DocumentData>[] | null;

  formattedDate = Date.toLocaleString();

  constructor(private router: Router) {
    this.data = null;
  }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    const querySnapshot = await getDocs(collection(db, "user")); // FIXME

    this.data = querySnapshot.docs;

    this.data.forEach((doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
      // console.log(`${doc.id}`);

      // const v: Array<DocumentData> = this.sortByDate(doc.data());
      // console.log(v);
      let zz: { unPoid: number, createdAt: Date } | null;
      // zz = this.findLastWeight(doc.data());
      // console.log(zz);
    });
  }

  logWeightMeasurements(userData: any) {
    if (userData && userData.poids && Array.isArray(userData.poids)) {
      userData.poids.forEach((measurement: any) => {
        console.log(`Poids : ${measurement.unPoid} kg, Mesuré le : ${measurement.createdAt}`);
      });
    } else {
      console.error('Le champ "poids" est manquant ou n\'est pas un tableau.');
    }
  }
  sortByDate(userData: any, order: 'asc' | 'desc' = 'asc'): Array<DocumentData> {
    if (userData && userData.poids && Array.isArray(userData.poids)) {
      const sortedWeights: Array<DocumentData> = userData.poids.sort((a: any, b: any) => {
        console.log('a=', a);
        console.log('b=', b);
        const dateA = (a.createdAt as Timestamp).toDate().getTime(); // Convertir en timestamp
        const dateB = (b.createdAt as Timestamp).toDate().getTime(); // Convertir en timestamp

        // if (order === 'asc') {
        //   return dateA - dateB; // Tri croissant
        // } else {
        return dateB - dateA; // Tri décroissant
        // }
      });

      console.log('Mesures de poids triées par date :', sortedWeights);

      const lastWeight = sortedWeights[0];
      // return 
      // let a = {
      //   'unPoid': lastWeight['unPoid'],
      //   'createdAt': (lastWeight['createdAt'] as Timestamp).toDate(), // Convertir en Date
      // };

      // console.log('last=', a);
      return sortedWeights;
    } else {
      console.error('Le champ "poids" est manquant ou n\'est pas un tableau.');
      return [];
    }
  }

  findLastWeight(userData: any): { unPoid: number, createdAt: Date } | null {
    console.log(userData);
    console.log(typeof userData);
    if (userData && userData.poids && Array.isArray(userData.poids)) {
      // Trier les mesures de poids par date (du plus récent au plus ancien)
      const sortedWeights = userData.poids.sort((a: any, b: any) => {
        const dateA = (a.createdAt as Timestamp).toDate().getTime(); // Convertir en timestamp
        const dateB = (b.createdAt as Timestamp).toDate().getTime(); // Convertir en timestamp
        return dateB - dateA; // Tri décroissant
      });

      // Récupérer le premier élément (le plus récent)
      const lastWeight = sortedWeights[0];
      return {
        unPoid: lastWeight.unPoid,
        createdAt: (lastWeight.createdAt as Timestamp).toDate(), // Convertir en Date
      };
    } else {
      console.error('Le champ "poids" est manquant ou n\'est pas un tableau.');
      return null;
    }
  }

  public dateToStringFormat(date: Date): string {
    let s: string | null;
    // s = this.datepipe.transform(d, 'yyyy/MM/dd');
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    const formattedDate: string = date.toLocaleDateString(undefined, options);
    return formattedDate === null ? "" : formattedDate;
  }

  testFct(userData: any) {
    // this.router.navigate(['/dashboard']);


  }
}
