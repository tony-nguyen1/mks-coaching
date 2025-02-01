import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Input } from '@angular/core';
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore"
import { Signal, signal } from '@angular/core';

import { UserService, User } from '../user.service';



@Component({
  selector: 'app-user-details',
  imports: [CommonModule, RouterModule], // Importez RouterModule pour utiliser routerLink
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent {
  userId: string;
  count = signal(0);

  user = signal(User.construct());

  constructor() {
    this.userId = "";
  }

  @Input()
  set id(userId: string) { // nom de la fonction match le nom du paramètre écris dans la route
    console.log(`UserDetailComponent: recieved ${userId} from the route`);

    this.userId = userId;
    const unUser: Promise<User> = UserService.getDetails(userId)
    unUser.then((user: User) => {
      console.log('in input', user.toString());
      this.user.set(user);
      console.log(this.user());
      this.count.set(3);
    });
  }
}

