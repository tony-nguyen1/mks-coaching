import { Injectable } from "@angular/core";

// Firestore
import { initializeApp } from "firebase/app";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocFromCache,
  getDocs,
  getFirestore,
  query,
  QueryDocumentSnapshot,
  updateDoc,
  where,
} from "firebase/firestore";
import { FIREBASE_CONFIG } from "./environment";

import { Mesure } from "./mesure.model";
import { MyUser } from "./my-user.model";

export type UsersData = {
  [id: string]: MyUser;
};

@Injectable({
  providedIn: "root",
})
export class UserService {
  private static prefix: string = "UserService:";
  // Initialize Firebase
  private static app = initializeApp(FIREBASE_CONFIG);

  // Initialize Cloud Firestore and get a reference to the service
  private static db = getFirestore(UserService.app);

  constructor() {
    /* TODO: implement singleton */
  }

  /**
   * rzerzer TODO : add documentation
   *
   * ezrze
   * @param userID eteztreztze
   * @returns zaeazeza
   */
  public async getUserDocIdFromUID(userID: string): Promise<MyUser> {
    const q = query(
      collection(UserService.db, "user"),
      where("UID", "==", userID),
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs.at(0)!;
      return Promise.resolve(
        new MyUser(
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

  public async createUser(aUser: MyUser) {
    return await addDoc(collection(UserService.db, "user"), aUser.toJSON());
  }

  public async getUsers(): Promise<Array<MyUser>> {
    let snapshot = await getDocs(collection(UserService.db, "user"));
    let users: Array<MyUser> = [];
    // users[''] = new User("", "", "", "", 0, Timestamp.now(), []);
    snapshot.forEach(
      (result: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
        // console.log(`${result.id} => `, result.data());
        users.push(
          new MyUser(
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

    const arrayOfClientUsers: Array<MyUser> = Array.from(
      snapshot.docs,
      (result) =>
        new MyUser(
          result.id,
          result.get("nom"),
          result.get("prenom"),
          result.get("email"),
          result.get("age"),
          result.get("createdAt"),
          result.get("poids"),
          result.get("role"),
        ),
    ).filter((aUser: MyUser) => aUser.role === "client");

    // console.log("testing: array=", arrayOfClientUsers);

    return Promise.resolve(arrayOfClientUsers);
    // console.log("testing:", users);

    // return snapshot;
  }
  public async searchMyUserByDocId(docId: string): Promise<MyUser> {
    console.log("Service getDetails()");
    // const querySnapshot = await getDocs(collection(UserService.db, "user"));

    const docRef = doc(UserService.db, "user", docId);
    try {
      console.log("is data cached ?");
      const docSnap = await getDocFromCache(docRef);

      console.log("data is cached !");

      return new MyUser(
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

        return new MyUser(
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

  public async addMesure(userId: string, aNewPoids: Mesure) {
    const docRef = doc(UserService.db, "user", userId);
    await updateDoc(docRef, {
      poids: arrayUnion(aNewPoids.toJson()),
    }).then(() => {
      console.log(`UserService: user ${userId} updated`);
    });
  }
}
