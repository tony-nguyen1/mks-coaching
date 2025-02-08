import { Injectable } from "@angular/core";

import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  UserCredential,
  User as FirebaseUser,
  UserMetadata,
} from "firebase/auth";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocFromCache,
  getDocs,
  getFirestore,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { FIREBASE_CONFIG } from "./environment";

@Injectable({
  providedIn: "root",
})
export class AuthentificationService {
  static prefix: string = "AuthentificationService:";

  private app;
  private db;

  constructor() {
    this.app = initializeApp(FIREBASE_CONFIG);
    this.db = getFirestore(this.app);
  }

  async signUp(email: string, password: string): Promise<UserCredential> {
    const auth = getAuth();
    const promiseUserCredential: Promise<UserCredential> =
      createUserWithEmailAndPassword(auth, email, password);

    return promiseUserCredential.then(
      (value: UserCredential) => {
        return Promise.resolve(value);
      },
      (reason: any) => {
        return Promise.reject(
          "Could not sign user up w/ Firebase Authentification ",
        );
      },
    );
  }

  async signIn(email: string, password: string): Promise<FirebaseUser> {
    try {
      const auth = getAuth();
      let userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const FirebaseUser = userCredential.user;

      return Promise.resolve(FirebaseUser);
    } catch (error) {
      return Promise.reject(
        "Email and password do not match w/ Firebase Authentification",
      );
    }
  }
}
