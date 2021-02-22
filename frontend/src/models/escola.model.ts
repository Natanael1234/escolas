import { AbstractSerializable } from "./serializable.abstract";

export class Escola extends AbstractSerializable {

  id: string;
  nome: string;
  logradouro: string;
  numero: number
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  complemento: string
  fone: string;
  email: string;
  ativa: boolean;

  constructor(data?: any | Escola) {
    super(data);
  }

  get endereco(): string {
    let endereco = [];
    if (this.logradouro) endereco.push(this.logradouro);
    if (this.numero) endereco.push(this.numero);
    if (this.complemento) endereco.push(this.complemento);
    if (this.cidade) endereco.push(this.cidade);
    if (this.estado) endereco.push(this.estado);
    if (this.cep) {
      let cep = this.cep.length > 5 ? this.cep.substring(0, 5) + '-' + this.cep.substring(5) : this.cep;
      endereco.push('CEP ' + cep);
    };
    return endereco.join(', ');
  }

  get locationLink() {
    return "https://maps.google.com/?q='" + (this.endereco.replace(/ /g, '+'));
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
