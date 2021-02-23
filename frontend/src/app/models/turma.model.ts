import { AbstractSerializable } from "./serializable.abstract";

export class Turma extends AbstractSerializable {

  numero: string;
  serie: number;
  ativa: boolean;
  escolaId: string;

  constructor(data?: any | Turma) {
    super(data);
  }

}
