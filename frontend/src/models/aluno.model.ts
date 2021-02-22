import { AbstractSerializable } from "./serializable.abstract";

export class Aluno extends AbstractSerializable {

  id: string;
  matricula: string;
  nome: string;
  cpf: string;
  logradouro: string;
  numero: number
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  complemento: string
  fone: string;
  email: string;
  serie: number;
  turmaId: string;
  escolaId: string;

  constructor(data?: any | Aluno) {
    super(data);
  }


  get contato(): string {
    let contato = [];
    if (this.fone) {
      var fone = this.fone.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
      contato.push(fone);
    }
    if (this.email) contato.push(this.email);
    return contato.join(', ');
  }

}
