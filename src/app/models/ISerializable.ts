export interface ISerializable {
  fromJSON(json: any): ISerializable;
  toJSON(): object;
}
