import { Timestamp } from "firebase/firestore";

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
