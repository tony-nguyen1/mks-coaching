import { Injectable } from "@angular/core";

// Firestore
import { initializeApp } from "firebase/app";
import {
  arrayUnion,
  DocumentReference,
  getFirestore,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  getDocs,
  DocumentData,
  getDoc,
  doc,
  getDocFromCache,
} from "firebase/firestore";
import { FIREBASE_CONFIG } from "./environment";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User as UserMetaData,
  UserMetadata,
} from "firebase/auth";
import { QuerySnapshot } from "firebase/firestore";
// Firestore

export type UsersData = {
  [id: string]: User;
};

@Injectable({
  providedIn: "root",
})
export class UserService {
  static prefix: string = "UserService:";
  // Initialize Firebase
  static app = initializeApp(FIREBASE_CONFIG);

  // Initialize Cloud Firestore and get a reference to the service
  static db = getFirestore(UserService.app);

  constructor() {
    /* TODO: implement singleton */
  }

  static async getUserDocIdFromUID(userID: string): Promise<User> {
    const q = query(
      collection(UserService.db, "user"),
      where("UID", "==", userID),
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs.at(0)!;
      return Promise.resolve(
        new User(
          docSnap.id,
          docSnap.data()["nom"],
          docSnap.data()["prenom"],
          docSnap.data()["email"],
          docSnap.data()["age"],
          docSnap.data()["createdAt"],
          docSnap.data()["poids"],
          docSnap.data()["role"],
        ),
      );
    } else {
      throw new Error(`getUserDocIdFromUID(${userID})`);
    }
  }

  static async signIn(email: string, password: string): Promise<UserMetaData> {
    try {
      const auth = getAuth();
      let userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const userMetaData = userCredential.user;

      return Promise.resolve(userMetaData);
    } catch (error) {
      return Promise.reject(
        "Email and password do not match w/ Firebase Authentification",
      );
    }
  }

  static async signUp(aUser: User) {
    throw new Error("Not yet implemented");
  }

  static async createUserAccount(email: string, password: string) {
    throw new Error("Not yet implemented");
  }
  static isConnected(): boolean {
    throw new Error("Not yet implemented");
  }
  static async getConnectedUser(): Promise<User> {
    console.log("UserService: getConnectedUser()");
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      console.log("UserService: user=", user);

      // TODO: get user from localstorage
    } else {
      console.log("No user is signed in");
      // No user is signed in.
    }
    return Promise.resolve(User.construct());
  }

  static async createUser(aUser: User) {
    return await addDoc(collection(this.db, "user"), aUser.toJSON());
  }

  static async getUsers(): Promise<Array<User>> {
    let snapshot = await getDocs(collection(UserService.db, "user"));
    let users: Array<User> = [];
    // users[''] = new User("", "", "", "", 0, Timestamp.now(), []);
    snapshot.forEach(
      (result: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
        // console.log(`${result.id} => `, result.data());
        users.push(
          new User(
            result.id,
            result.get("nom"),
            result.get("prenom"),
            result.get("email"),
            result.get("age"),
            result.get("createdAt"),
            result.get("poids"),
            result.get("role"),
          ),
        );
      },
    );

    const arrayOfClientUsers: Array<User> = Array.from(
      snapshot.docs,
      (result) =>
        new User(
          result.id,
          result.get("nom"),
          result.get("prenom"),
          result.get("email"),
          result.get("age"),
          result.get("createdAt"),
          result.get("poids"),
          result.get("role"),
        ),
    ).filter((aUser: User) => aUser.role === "client");

    // console.log("testing: array=", arrayOfClientUsers);

    return Promise.resolve(arrayOfClientUsers);
    // console.log("testing:", users);

    // return snapshot;
  }
  static async getDetails(userId: string): Promise<User> {
    console.log("Service getDetails()");
    // const querySnapshot = await getDocs(collection(UserService.db, "user"));

    const docRef = doc(UserService.db, "user", userId);
    try {
      console.log("is data cached ?");
      const docSnap = await getDocFromCache(docRef);

      console.log("data is cached !");

      return new User(
        docSnap.id,
        docSnap.data()!["nom"],
        docSnap.data()!["prenom"],
        docSnap.data()!["email"],
        docSnap.data()!["age"],
        docSnap.data()!["createdAt"],
        docSnap.data()!["poids"],
        docSnap.data()!["role"],
      );
    } catch (error) {
      console.log(
        "errror getting cached document, dw, expected behavior, it means data was not cached",
      );
      console.log("retrieving Document data from server");

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("found it");

        return new User(
          docSnap.id,
          docSnap.data()["nom"],
          docSnap.data()["prenom"],
          docSnap.data()["email"],
          docSnap.data()["age"],
          docSnap.data()["createdAt"],
          docSnap.data()["poids"],
          docSnap.data()["role"],
        );
      } else {
        throw new Error(
          "No such document! userId did not match any documents in the database",
        );
      }
    }
  }

  static async addMesure(userId: string, aNewPoids: Mesure) {
    const docRef = doc(UserService.db, "user", userId);
    await updateDoc(docRef, {
      poids: arrayUnion(aNewPoids.toJson()),
    }).then(() => {
      console.log(`UserService: user ${userId} updated`);
    });
  }
}

export class User {
  public userId: string;
  public nom: string;
  public prenom: string;
  public email: string;
  public age: number;
  public createdAt: Timestamp;
  public poids: Array<Mesure>;
  public role: string;

  static construct() {
    let newUser = new User(
      "",
      "",
      "",
      "",
      0,
      new Timestamp(0, 0),
      new Array(),
      "client",
    );
    return newUser;
  }

  constructor(
    unUserId: string,
    nom: string,
    prenom: string,
    email: string,
    age: number,
    createdAt: Timestamp,
    desPoids: Array<any>,
    role: string,
  ) {
    this.userId = unUserId;
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.age = age;
    this.createdAt = createdAt;
    this.poids = [];
    desPoids.forEach((uneMesure) => {
      this.poids.push(new Mesure(uneMesure["unPoid"], uneMesure["createdAt"]));
    });
    this.role = role;
  }

  // // Méthode pour afficher les informations de l'utilisateur
  public toString(): string {
    return `User: ${this.nom} ${this.prenom} (${this.email}), Âge: ${this.age}, Créé le: ${this.createdAt.toDate().toLocaleDateString()}. Mesures : [${this.poids.toString()}]`;
  }

  // Méthode pour convertir l'objet en JSON
  public toJSON(): object {
    let p: Array<object>;
    p = Array.from(this.poids, (uneMesure: Mesure) => uneMesure.toJson());
    let o: object;
    o = {
      // id: this.userId,
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      age: this.age,
      pseudo: "",
      createdAt: this.createdAt,
      role: "client",
      poids: p,
      // updatedAt: this.updatedAt,
    };

    // console.log();
    return o;
  }
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

  public toJson() {
    return { unPoid: this.poid, createdAt: this.createdAt };
  }
}
