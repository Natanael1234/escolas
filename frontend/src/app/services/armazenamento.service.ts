import { Injectable } from '@angular/core';
import { Aluno } from '../models/aluno.model';
import { Escola } from '../models/escola.model';
import { Turma } from '../models/turma.model';

/**
 * Simula o banco de dados.
 */
@Injectable({
  providedIn: 'root'
})
export class ArmazenamentoService {


  constructor() { }

  setValue(key, data: any) {
    let str = data ? JSON.stringify(data) : data;
    localStorage.setItem(key, str);
  }

  getValue(key): any {
    let str = localStorage.getItem(key);
    let data = str ? JSON.parse(str) : str;
    return data;
  }

  get escolaId() {
    let id = this.getValue('escolaId') || 1;
    this.setValue('escolaId', id + 1);
    return id;
  }

  get turmaId() {
    let id = this.getValue('turmaId') || 1;
    this.setValue('turmaId', id + 1);
    return id;
  }

  get alunoId() {
    let id = this.getValue('alunoId') || 1;
    this.setValue('alunoId', id + 1);
    return id;
  }

  remove(key) {
    return localStorage.removeItem(key);
  }

  getAlunos(): Aluno[] {
    return (this.getValue('alunos') || []).map(data => new Aluno(data));
  }

  getAluno(alunoId: string): Aluno {
    return this.getAlunos().find(aluno => aluno.id == alunoId);
  }

  populate() {

    let escolas:Escola[] = [];
    let turmas:Turma[] = [];
    let alunos:Aluno[] = [];
    let escolaId = 1;
    let turmaId = 1;
    let alunoId = 1;
    console.log('Polulando base de dados');
    for (let escolaIdx = 1; escolaIdx <= 10; escolaIdx++, escolaId++) {
      let escola = new Escola();
      escola.id = escolaId + '';
      escola.nome = `Escola #${escolaIdx}`;
      escola.cep = '18278000';
      escola.estado = 'SP';
      escola.cidade = 'Tatuí';
      escola.bairro = 'Vila Nova Esperança';
      escola.logradouro = 'Rua Antônio Henrique da Silva ' + escolaIdx;
      escola.numero = 635;
      escola.complemento = '';
      escola.fone = '(15) 325' + escolaIdx + '-3996';
      escola.email = `escola_${escolaIdx}@email.edu.br`;
      escola.ativa = Math.random() < 0.5;
      escolas.push(escola);
      for (let turmaIdx = 1; turmaIdx < 8; turmaIdx++, turmaId++) {
        let turma = new Turma();
        turma.id = turmaId + '';
        turma.ativa = Math.random() < 0.5;
        turma.numero = turmaIdx + '';
        turma.escolaId = escola.id;
        turma.serie = turmaIdx + 1;
        turmas.push(turma);
        for (let alunoIdx = 1; alunoIdx < 20; alunoIdx++, alunoId++) {
          let aluno = new Aluno();
          aluno.id = alunoId + '';
          aluno.nome = 'Aluno #' + turmaIdx;
          aluno.matricula = Math.floor(Math.random() * 1000000000) + '';
          aluno.cpf = '184.118.870-06';
          aluno.logradouro = 'Rua X';
          aluno.numero = 32;
          aluno.bairro = escola.bairro;
          aluno.cidade = escola.cidade;
          aluno.estado = escola.estado;
          aluno.cep = escola.cep;
          aluno.complemento = '';
          aluno.fone = '(15) 325' + alunoIdx + '-3996';
          aluno.email = `aluno_${alunoIdx}@email.edu.br`;
          aluno.serie = turma.serie;
          aluno.turmaId = turma.id;
          aluno.escolaId = escola.id;
          alunos.push(aluno);
        }
      }
    }
    this.setValue('escolaId', escolaId);
    this.setValue('turmaId', turmaId);
    this.setValue('alunoid', alunoId);

    this.setValue('escolas', escolas);
    this.setValue('turmas', turmas);
    this.setValue('alunos', alunos);

    console.log('Conluído');
  }

  salvaAluno(aluno: Aluno) {
    let alunos = this.getAlunos();
    if (!aluno.id) {
      aluno.id = this.alunoId;
      alunos.push(aluno);
    }
    else {
      let _aluno = alunos.find(_aluno => _aluno.id == aluno.id);
      if (_aluno) {
        _aluno.deserialize(aluno);
      }
      else {
        alunos.push(aluno);
      }
    }
    this.setValue('alunos', alunos);
    return aluno;
  }

  getEscolas(): Escola[] {
    let str = this.getValue('escolas');
    return (this.getValue('escolas') || []).map(data => new Escola(data));
  }

  getEscola(escolaId: string): Escola {
    return this.getEscolas().find(escola => escola.id == escolaId);
  }

  salvaEscola(escola: Escola) {
    let escolas = this.getEscolas();
    if (!escola.id) {
      escola.id = this.escolaId;
      escolas.push(escola);
    }
    else {
      let _escola = escolas.find(_escola => _escola.id == escola.id);
      if (_escola) {
        _escola.deserialize(escola);
      }
      else {
        escolas.push(escola);
      }
    }
    this.setValue('escolas', escolas);
    return escola;
  }

  getTurmas(): Turma[] {
    return (this.getValue('turmas') || []).map(data => new Turma(data));
  }

  getTurma(turmaId: string): Turma {
    return this.getTurmas().find(turma => turma.id == turmaId);
  }

  salvaTurma(turma: Turma) {
    let turmas = this.getTurmas();
    if (!turma.id) {
      turma.id = this.turmaId;
      turmas.push(turma);
    }
    else {
      let _turma = turmas.find(_turma => _turma.id == turma.id);
      if (_turma) {
        _turma.deserialize(turma);
      }
      else {
        turmas.push(turma);
      }
    }
    this.setValue('turmas', turmas);
    return turma;
  }


}
