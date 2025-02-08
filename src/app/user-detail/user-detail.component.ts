import { Component } from "@angular/core";

import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Input } from "@angular/core";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { Signal, signal } from "@angular/core";

import { UserService } from "../user.service";
import { MyUser } from "../my-user.model";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  NgApexchartsModule,
  ApexMarkers,
  ApexAnnotations,
} from "ng-apexcharts";

// Firestore
import { initializeApp } from "firebase/app";
import { DocumentReference, getFirestore } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { FIREBASE_CONFIG } from "../environment";
// Firestore

import { ReactiveFormsModule, FormControl } from "@angular/forms";
import { Mesure } from "../mesure.model";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  markers: ApexMarkers;
  annotations: ApexAnnotations;
};
@Component({
  selector: "app-user-details",
  imports: [
    CommonModule,
    RouterModule,
    NgApexchartsModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.css"],
})
export class UserDetailComponent {
  userId: string;
  user = signal(MyUser.construct());
  public chartOptions: ChartOptions | null;
  // public mark : ApexMarkers =
  // public inscriptionForm: FormGroup;
  public mesureForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
  ) {
    this.userId = "";
    //   annotations: {
    //     yaxis: [{
    //       y: 75,
    //       // y2: null,
    //       strokeDashArray: 16,
    //       borderColor: '#ff0000',
    //       // fillColor: '#c2c2c2',
    //       // opacity: 1,
    //       offsetX: 0,
    //       offsetY: -6,
    //       width: '100%',
    //       // yAxisIndex: 0,
    //       label: {
    //         borderColor: '#c2c2c2',
    //         borderWidth: 1,
    //         borderRadius: 2,
    //         text: "Goal",
    //         textAnchor: 'end',
    //         position: 'right',
    //         offsetX: 0,
    //         offsetY: 0,
    //         mouseEnter: undefined,
    //         mouseLeave: undefined,
    //         click: undefined,
    //         style: {
    //           background: '#fff',
    //           color: '#777',
    //           fontSize: '12px',
    //           fontWeight: 400,
    //           fontFamily: undefined,
    //           cssClass: 'apexcharts-yaxis-annotation-label',
    //           padding: {
    //             left: 6,
    //             right: 6,
    //             top: 2,
    //             bottom: 2,
    //           }
    //         },
    //       },
    //     }, {
    //       y: 30,
    //       // y2: null,
    //       strokeDashArray: 16,
    //       borderColor: '#ff0000',
    //       // fillColor: '#c2c2c2',
    //       // opacity: 1,
    //       offsetX: 0,
    //       offsetY: -6,
    //       width: '100%',
    //       // yAxisIndex: 0,
    //       label: {
    //         borderColor: '#c2c2c2',
    //         borderWidth: 1,
    //         borderRadius: 2,
    //         text: "Record personel",
    //         textAnchor: 'end',
    //         position: 'right',
    //         offsetX: 0,
    //         offsetY: 0,
    //         mouseEnter: undefined,
    //         mouseLeave: undefined,
    //         click: undefined,
    //         style: {
    //           background: '#fff',
    //           color: '#777',
    //           fontSize: '12px',
    //           fontWeight: 400,
    //           fontFamily: undefined,
    //           cssClass: 'apexcharts-yaxis-annotation-label',
    //           padding: {
    //             left: 6,
    //             right: 6,
    //             top: 2,
    //             bottom: 2,
    //           }
    //         },
    //       },
    //     }]
    //   },
    //   markers: {
    //     size: 3,
    //     colors: ["red"],
    //     strokeColors: '#fff',
    //     shape: "circle"
    //     // hover: {
    //     //   size: 8,
    //     //   sizeOffset: 10
    //     // }
    //   },
    //   series: [
    //     {
    //       name: "Poids moyen au cours de ce mois",
    //       data: [10, 41, 35, 51, 49, null, null, 91, 148]
    //     }
    //   ],
    //   chart: {
    //     height: 350,
    //     type: "line"
    //   },
    //   title: {
    //     text: "Mon poids"
    //   },
    //   xaxis: {
    //     categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
    //   }
    // };
    this.chartOptions = null;
    this.mesureForm = this.fb.group({
      mesure: ["", []],
    });
  }
  get mesure() {
    return this.mesureForm.get("mesure");
  }
  handleSubmit() {
    console.log("it clicked!");
    let aUser: MyUser;
    aUser = this.user();
    // aUser.poids.push({ poid: this.mesure?.value, createdAt: Timestamp.now() } as Mesure);
    let aNewMesure = new Mesure(this.mesure?.value, Timestamp.now());
    // console.log("UserDetailComponent: ", this.user());
    UserService.addMesure(this.userId, aNewMesure).then(() => {
      aUser.poids.push(aNewMesure);
    });
  }
  @Input()
  set id(docId: string) {
    // nom de la fonction match le nom du paramètre écris dans la route
    console.log(`UserDetailComponent: recieved ${docId} from the route`);

    this.userId = docId;
    const unUser: Promise<MyUser> = UserService.searchMyUserByDocId(docId);
    unUser.then((user: MyUser) => {
      console.log("in input", user.toString());
      this.user.set(user); // reactively rerender component
      console.log(this.user());

      let usableDataUser: Array<[number, number]>;
      // convert timestamp into number for compatibility w/ ApexChart
      usableDataUser = Array.from(
        this.user().poids,
        (uneMesure: Mesure, key: number) => [
          uneMesure.createdAt.toMillis(),
          uneMesure.poid,
        ],
      );
      this.makeChart(usableDataUser);
    });
  }

  private makeChart(dataUser: Array<[number, number]>): void {
    console.log("dataUser=", dataUser);

    this.chartOptions = {
      annotations: {
        yaxis: [
          {
            y: 75,
            // y2: null,
            strokeDashArray: 16,
            borderColor: "#ff0000",
            // fillColor: '#c2c2c2',
            // opacity: 1,
            offsetX: 0,
            offsetY: -6,
            width: "100%",
            // yAxisIndex: 0,
            label: {
              borderColor: "#c2c2c2",
              borderWidth: 1,
              borderRadius: 2,
              text: "Goal",
              textAnchor: "end",
              position: "right",
              offsetX: 0,
              offsetY: 0,
              mouseEnter: undefined,
              mouseLeave: undefined,
              click: undefined,
              style: {
                background: "#fff",
                color: "#777",
                fontSize: "12px",
                fontWeight: 400,
                fontFamily: undefined,
                cssClass: "apexcharts-yaxis-annotation-label",
                padding: {
                  left: 6,
                  right: 6,
                  top: 2,
                  bottom: 2,
                },
              },
            },
          },
          {
            y: 30,
            // y2: null,
            strokeDashArray: 16,
            borderColor: "#ff0000",
            // fillColor: '#c2c2c2',
            // opacity: 1,
            offsetX: 0,
            offsetY: -6,
            width: "100%",
            // yAxisIndex: 0,
            label: {
              borderColor: "#c2c2c2",
              borderWidth: 1,
              borderRadius: 2,
              text: "Record personel",
              textAnchor: "end",
              position: "right",
              offsetX: 0,
              offsetY: 0,
              mouseEnter: undefined,
              mouseLeave: undefined,
              click: undefined,
              style: {
                background: "#fff",
                color: "#777",
                fontSize: "12px",
                fontWeight: 400,
                fontFamily: undefined,
                cssClass: "apexcharts-yaxis-annotation-label",
                padding: {
                  left: 6,
                  right: 6,
                  top: 2,
                  bottom: 2,
                },
              },
            },
          },
        ],
      },
      markers: {
        size: 3,
        colors: ["red"],
        strokeColors: "#fff",
        shape: "circle",
        // hover: {
        //   size: 8,
        //   sizeOffset: 10
        // }
      },
      series: [
        {
          name: "Poids moyen au cours de ce mois",
          data: dataUser, //[10, 41, 35, 51, 49, null, null, 91, 148]
        },
      ],
      chart: {
        height: 350,
        type: "line",
      },
      title: {
        text: "Mon poids",
      },
      xaxis: {
        type: "datetime",
        min: new Date("31 Jan 2025").getTime(),
        tickAmount: 6,
        // categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
      },
    };
  }

  async soumettre() {
    console.log("UserDetailComponent: ", this.user);
    // if (this.inscriptionForm.valid) {
    //   // Générer un timestamp comme ID du document
    //   const timestamp = Date.now().toString(); // ou utiliser `Timestamp.now().toMillis().toString()`

    //   const docRef = await addDoc(collection(db, "user"), {
    //     email: this.inscriptionForm.value.email,
    //     // password: this.inscriptionForm.value.password, // BAD !!!
    //     nom: this.inscriptionForm.value.nom,
    //     prenom: this.inscriptionForm.value.prenom,
    //     age: this.inscriptionForm.value.age,
    //     poids: [{ unPoid: this.inscriptionForm.value.poids, createdAt: Timestamp.now() }],
    //     pseudo: this.inscriptionForm.value.pseudo,
    //     createdAt: Timestamp.now(), // Ajouter un champ timestamp pour la date de création
    //     role: "client" // "admin" ; "max" ;
    //   }).then((d: DocumentReference) => {

    //     console.log('Document écrit avec ID :', d.id, ' ts :', timestamp);
    //   }).catch(error => {
    //     console.error('Erreur lors de l\'ajout du document :', error);
    //   });
    //   console.log('Après écriture du Document');
    // } else {
    //   console.error('Formulaire invalide');
    // }
  }
}
