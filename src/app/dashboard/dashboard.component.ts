import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { UserDetailComponent } from "../user-detail/user-detail.component";

// Firestore
import { FirebaseApp, initializeApp } from "firebase/app";
import {
  DocumentReference,
  getFirestore,
  QuerySnapshot,
  QueryDocumentSnapshot,
  Firestore,
} from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { FIREBASE_CONFIG } from "../environment";
// Firestore

import { UsersData, UserService } from "../user.service";
import { MyUser } from "../my-user.model";
import { Mesure } from "../mesure.model";

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
  selector: "app-dashboard",
  imports: [
    CommonModule,
    // UserDetailComponent,
    RouterModule,
  ],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent {
  data: QueryDocumentSnapshot<DocumentData, DocumentData>[] | null;
  public mySignal: any;
  public a: Array<MyUser>;
  public loading: boolean = true;

  formattedDate = Date.toLocaleString();

  constructor(
    private router: Router,
    private userService: UserService,
  ) {
    this.data = null;
    this.a = [];
  }

  async ngOnInit() {
    // UserService.getConnectedUser();

    this.getData();
    this.a = await this.userService.getUsers();
    console.log("DashboardComponent: allClientsUsers=", this.a);

    // fixme: signaling ? or maybe Promise + await ?
  }

  async getData() {
    const querySnapshot = await getDocs(collection(db, "user")); // FIXME
    this.data = querySnapshot.docs;
    this.loading = false;
  }

  findLastWeight(aUser: MyUser): number {
    const sortedWeights: Array<Mesure> = aUser.poids.sort(
      (a: Mesure, b: Mesure) => {
        const dateA = (a.createdAt as Timestamp).toDate().getTime(); // Convertir en timestamp
        const dateB = (b.createdAt as Timestamp).toDate().getTime(); // Convertir en timestamp
        return dateB - dateA; // Tri décroissant
      },
    );

    return sortedWeights[0].poid;
  }
  public dateToStringFormat(date: Date): string {
    let s: string | null;
    // s = this.datepipe.transform(d, 'yyyy/MM/dd');
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const formattedDate: string = date.toLocaleDateString(undefined, options);
    return formattedDate === null ? "" : formattedDate;
  }
}
