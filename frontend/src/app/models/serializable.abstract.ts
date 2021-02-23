export class AbstractSerializable {

  id: string;

  constructor(data?: any) {
    this.deserialize(data);
  }

  serialize() {
    return JSON.parse(JSON.stringify(this));
  }

  deserialize(data?: any): any {
    Object.assign(this, data);
  }


}
