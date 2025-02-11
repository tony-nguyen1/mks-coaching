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

  private isConnected: boolean;

  constructor() {
    this.app = initializeApp(FIREBASE_CONFIG);
    this.db = getFirestore(this.app);
    this.isConnected = false;
  }

  isLoggedIn(): boolean {
    let b: boolean = !!localStorage.getItem("userToken");
    console.log(AuthentificationService.prefix, "isLoggedIn=", b);
    return b; // Vérifie si un token est présent
  }

  async signUp(email: string, password: string): Promise<UserCredential> {
    const auth = getAuth();
    const promiseUserCredential: Promise<UserCredential> =
      createUserWithEmailAndPassword(auth, email, password);

    // localStorage.setItem("userToken", promiseUserCredential. user.uid);
    return promiseUserCredential.then(
      (value: UserCredential) => {
        localStorage.setItem("userToken", value.user.uid);
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

      localStorage.setItem("userToken", userCredential.user.uid);
      return Promise.resolve(FirebaseUser);
    } catch (error) {
      return Promise.reject(
        "Email and password do not match w/ Firebase Authentification",
      );
    }
  }

  async signOut() {
    localStorage.removeItem("userToken");
    throw new Error("Not yet implemented");
  }
}
