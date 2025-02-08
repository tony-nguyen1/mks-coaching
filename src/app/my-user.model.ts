import { Timestamp } from "firebase/firestore";
import { Mesure } from "./mesure.model";

export class MyUser {
  public userId: string;
  public nom: string;
  public prenom: string;
  public email: string;
  public age: number;
  public createdAt: Timestamp;
  public poids: Array<Mesure>;
  public role: string;

  static construct() {
    let newUser = new MyUser(
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
