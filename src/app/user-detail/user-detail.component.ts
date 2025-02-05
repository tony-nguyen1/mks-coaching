import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Input } from '@angular/core';
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore"
import { Signal, signal } from '@angular/core';

import { UserService, User, Mesure } from '../user.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  NgApexchartsModule, ApexMarkers, ApexAnnotations
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  markers: ApexMarkers,
  annotations: ApexAnnotations
};
@Component({
  selector: 'app-user-details',
  imports: [CommonModule, RouterModule, NgApexchartsModule], // Importez RouterModule pour utiliser routerLink
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent {
  userId: string;
  user = signal(User.construct());
  public chartOptions: ChartOptions | null;
  // public mark : ApexMarkers = 

  constructor() {
    this.userId = "";
    // this.chartOptions = {
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
  }

  @Input()
  set id(userId: string) { // nom de la fonction match le nom du paramètre écris dans la route
    console.log(`UserDetailComponent: recieved ${userId} from the route`);

    this.userId = userId;
    const unUser: Promise<User> = UserService.getDetails(userId);
    unUser.then((user: User) => {
      console.log('in input', user.toString());
      this.user.set(user); // reactively rerender component
      console.log(this.user());


      let usableDataUser: Array<[number, number]>;
      // convert timestamp into number for compatibility w/ ApexChart
      usableDataUser = Array.from(this.user().poids, (uneMesure: Mesure, key: number) => ([uneMesure.createdAt.toMillis(), uneMesure.poid]));
      this.makeChart(usableDataUser);
    });
  }

  private makeChart(dataUser: Array<[number, number]>): void {
    console.log("dataUser=", dataUser);

    this.chartOptions = {
      annotations: {
        yaxis: [{
          y: 75,
          // y2: null,
          strokeDashArray: 16,
          borderColor: '#ff0000',
          // fillColor: '#c2c2c2',
          // opacity: 1,
          offsetX: 0,
          offsetY: -6,
          width: '100%',
          // yAxisIndex: 0,
          label: {
            borderColor: '#c2c2c2',
            borderWidth: 1,
            borderRadius: 2,
            text: "Goal",
            textAnchor: 'end',
            position: 'right',
            offsetX: 0,
            offsetY: 0,
            mouseEnter: undefined,
            mouseLeave: undefined,
            click: undefined,
            style: {
              background: '#fff',
              color: '#777',
              fontSize: '12px',
              fontWeight: 400,
              fontFamily: undefined,
              cssClass: 'apexcharts-yaxis-annotation-label',
              padding: {
                left: 6,
                right: 6,
                top: 2,
                bottom: 2,
              }
            },
          },
        }, {
          y: 30,
          // y2: null,
          strokeDashArray: 16,
          borderColor: '#ff0000',
          // fillColor: '#c2c2c2',
          // opacity: 1,
          offsetX: 0,
          offsetY: -6,
          width: '100%',
          // yAxisIndex: 0,
          label: {
            borderColor: '#c2c2c2',
            borderWidth: 1,
            borderRadius: 2,
            text: "Record personel",
            textAnchor: 'end',
            position: 'right',
            offsetX: 0,
            offsetY: 0,
            mouseEnter: undefined,
            mouseLeave: undefined,
            click: undefined,
            style: {
              background: '#fff',
              color: '#777',
              fontSize: '12px',
              fontWeight: 400,
              fontFamily: undefined,
              cssClass: 'apexcharts-yaxis-annotation-label',
              padding: {
                left: 6,
                right: 6,
                top: 2,
                bottom: 2,
              }
            },
          },
        }]
      },
      markers: {
        size: 3,
        colors: ["red"],
        strokeColors: '#fff',
        shape: "circle"
        // hover: {
        //   size: 8,
        //   sizeOffset: 10
        // }
      },
      series: [
        {
          name: "Poids moyen au cours de ce mois",
          data: dataUser//[10, 41, 35, 51, 49, null, null, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      title: {
        text: "Mon poids"
      },
      xaxis: {
        type: 'datetime',
        min: new Date('31 Jan 2025').getTime(),
        tickAmount: 6,
        // categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
      }
    };
  }
}



