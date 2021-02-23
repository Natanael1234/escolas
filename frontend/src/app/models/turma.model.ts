import { AbstractSerializable } from "./serializable.abstract";

export class Turma extends AbstractSerializable {

  id: string;
  numero: string;
  serie: number;
  ativa: boolean;
  escolaId: string;

  constructor(data?: any | Turma) {
    super(data);
  }

}
