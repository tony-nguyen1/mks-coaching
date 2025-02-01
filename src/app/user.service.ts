import { Injectable } from '@angular/core';

// Firestore
import { initializeApp } from "firebase/app";
import { DocumentReference, getFirestore, QueryDocumentSnapshot } from "firebase/firestore";
import { Timestamp } from 'firebase/firestore';
import { collection, addDoc } from "firebase/firestore";
import { getDocs, DocumentData, getDoc, doc, getDocFromCache } from "firebase/firestore";
import { FIREBASE_CONFIG } from "./environment";
// Firestore

import { Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Initialize Firebase
  static app = initializeApp(FIREBASE_CONFIG);

  // Initialize Cloud Firestore and get a reference to the service
  static db = getFirestore(UserService.app);

  constructor() { }

  static async getDetails(userId: string): Promise<User> {
    console.log("Service getDetails()");
    // const querySnapshot = await getDocs(collection(UserService.db, "user"));

    const docRef = doc(UserService.db, "user", userId);
    try {
      console.log("is data cached ?");
      const docSnap = await getDocFromCache(docRef);

      if (docSnap.exists()) {
        console.log('data is cached !');
        console.log("Cached document data:", docSnap.data());
        // console.log("Document data from cache:", docSnap.data());
        // return docSnap.data();
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        // return null;
      }
      // Document was found in the cache. If no cached document exists,
      // an error will be returned to the 'catch' block below.

      return docSnap.exists() ? new User(
        docSnap.id,
        docSnap.data()['nom'],
        docSnap.data()['prenom'],
        docSnap.data()['email'],
        docSnap.data()['age'],
        docSnap.data()['createdAt'],
        docSnap.data()['poids']
      ) : User.construct();
    } catch (error) {
      console.log("errror getting cached document, dw");//, error);
      const docSnap = await getDoc(docRef);

      console.log("retrieving Document data from server");
      if (docSnap.exists()) {
        console.log('found it');
        // console.log("Retrieving Document data from server:", docSnap.data());
        // console.log('data isn\'t cached');
        // let v = cityConverter.fromFirestore(docSnap, null);
        // console.log(v);

        let u = new User(
          docSnap.id,
          docSnap.data()['nom'],
          docSnap.data()['prenom'],
          docSnap.data()['email'],
          docSnap.data()['age'],
          docSnap.data()['createdAt'],
          docSnap.data()['poids']
        );
        return u;
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        return User.construct();
      }
    }
  }
}

export class User {
  // Propriétés privées
  public userId: string;
  public nom: string;
  public prenom: string;
  public email: string;
  public age: number;
  // private password: string;
  public createdAt: Timestamp;
  // private updatedAt: Date;
  public poids: Array<Mesure>;

  static construct() {
    let newUser = new User("", "", "", "", 0, new Timestamp(0, 0), new Array());
    return newUser;
  }

  constructor(unUserId: string, nom: string, prenom: string, email: string, age: number, createdAt: Timestamp, desPoids: Array<any>) {
    this.userId = unUserId;
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.age = age;
    this.createdAt = createdAt;
    this.poids = [];
    desPoids.forEach((uneMesure) => {
      this.poids.push(new Mesure(uneMesure['unPoid'], uneMesure['createdAt']));
    });
  }

  // // Méthode pour afficher les informations de l'utilisateur
  public toString(): string {
    return `User: ${this.nom} ${this.prenom} (${this.email}), Âge: ${this.age}, Créé le: ${this.createdAt.toDate().toLocaleDateString()}. Mesures : [${this.poids.toString()}]`;
  }

  // Méthode pour convertir l'objet en JSON
  // public toJSON(): object {
  //   return {
  //     id: this.id,
  //     firstName: this.firstName,
  //     lastName: this.lastName,
  //     email: this.email,
  //     age: this.age,
  //     createdAt: this.createdAt,
  //     updatedAt: this.updatedAt,
  //   };
  // }
}

export class Mesure {
  public poid: number;
  public createdAt: Timestamp;

  constructor(unPoid: number, unTimeStamp: Timestamp) {
    this.poid = unPoid;
    this.createdAt = unTimeStamp; //unTimeStamp.toDate();
  }

  public toString() {
    let s = "{";
    s += `poid: ${this.poid},`;
    s += `createdAt: ${this.createdAt.toString()}`;
    return s + "}";
  }
}