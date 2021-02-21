


import { Injectable } from '@angular/core';
import { Escola } from '../../models/escola.model';

@Injectable()
export class EscolasProvider {

  /**
   * Simula o banco de dados
   */
  private escolas: Escola[] = [];
  private lastId = 1;

  constructor() {
    for (; this.lastId <= 100; this.lastId++) {
      let escola = new Escola();
      escola.id = this.lastId + '';
      escola.nome = `Escola ${this.lastId}`;
      escola.cep = '18278000';
      escola.estado = 'SP';
      escola.cidade = 'Tatuí';
      escola.bairro = 'Vila Nova Esperança';
      escola.logradouro = 'Rua Antônio Henrique da Silva ' + this.lastId;
      escola.numero = 635;
      escola.complemento = '';
      escola.fone = '(15) 325' + this.lastId + '-3996';
      escola.email = `escola_${this.lastId}@email.edu.br`;
      this.escolas.push(escola);
    }

  }

  /**
   * Lista escolas.
   * @param filtros
   */
  async carregaEscolas(filtros?: any): Promise<Escola[]> {
    return this.escolas.map(escola => new Escola(escola));
  }

  /**
   * Salva uma escola.
   * @param escola dados da escola.
   */
  salvaEscola(escola: Escola) {
    let _escola = escola.id ? this.escolas.find(_escola => _escola.id == escola.id) : null;
    if (!_escola) {
      _escola = new Escola(escola);
      _escola.id = `${this.lastId++}`;
      this.escolas.push(_escola);
    } else {
      _escola.deserialize(escola);
    }
  }

  /**
   * Busca uma escola.
   * @param escolaId
   */
  carregaEscola(escolaId: string) {
    return this.escolas.find(escola => escola.id == escolaId);
  }

}
