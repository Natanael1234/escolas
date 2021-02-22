import { Injectable } from '@angular/core';
import { Aluno } from '../../models/aluno.model';
import { Escola } from '../../models/escola.model';
import { Turma } from '../../models/turma.model';

@Injectable()
export class EscolasProvider {

  // Simula o banco de dados
  private escolas: Escola[] = [];
  private turmas: Turma[] = [];
  private alunos: Aluno[] = [];
  private lastEscolaId = 1;
  private lastTurmaId = 1;
  private lastAlunoId = 1;

  constructor() {
    for (let escolaIdx = 1; escolaIdx <= 10; escolaIdx++, this.lastEscolaId++) {
      let escola = new Escola();
      escola.id = this.lastEscolaId + '';
      escola.nome = `Escola #${this.lastEscolaId}`;
      escola.cep = '18278000';
      escola.estado = 'SP';
      escola.cidade = 'Tatuí';
      escola.bairro = 'Vila Nova Esperança';
      escola.logradouro = 'Rua Antônio Henrique da Silva ' + this.lastEscolaId;
      escola.numero = 635;
      escola.complemento = '';
      escola.fone = '(15) 325' + this.lastEscolaId + '-3996';
      escola.email = `escola_${this.lastEscolaId}@email.edu.br`;
      escola.ativa = true;
      this.escolas.push(escola);
      for (let turmaIdx = 0; turmaIdx < 8; turmaIdx++, this.lastTurmaId++) {
        let turma = new Turma();
        turma.id = this.lastTurmaId + '';
        turma.ativa = true;
        turma.numero = turmaIdx + '';
        turma.escolaId = escola.id;
        turma.serie = turmaIdx + 1;
        this.turmas.push(turma);
        for (let alunoIdx = 1; alunoIdx < 20; alunoIdx++, this.lastAlunoId++) {
          let aluno = new Aluno();
          aluno.nome = 'Aluno #' + this.lastAlunoId;
          aluno.cpf = '184.118.870-06';
          aluno.logradouro = 'Rua X';
          aluno.numero = 32;
          aluno.bairro = escola.bairro;
          aluno.cidade = escola.cidade;
          aluno.estado = escola.estado;
          aluno.cep = escola.cep;
          aluno.complemento = '';
          aluno.fone = '(15) 325' + this.lastAlunoId + '-3996';
          aluno.email = `aluno_${this.lastAlunoId}@email.edu.br`;
          aluno.serie = turma.serie;
          aluno.turmaId = turma.id;
          aluno.escolaId = escola.id;
          this.alunos.push(aluno);
        }
      }
    }

  }

  /**
   * Lista escolas.
   * @param filtros
   */
  async listaEscolas(): Promise<Escola[]> {
    return this.escolas.map(escola => new Escola(escola));
  }

  /**
   * Lista turmas.
   * @param escolaId
   */
  async listaTurmas(filtros: { escolaId: string }): Promise<Turma[]> {
    if (!filtros || !filtros.escolaId) throw new Error('Parâmetros inválidos');
    return this.turmas
      .filter(turma => turma.escolaId == filtros.escolaId)
      .map(turma => new Turma(turma));
  }

  /**
   * Lista alunos.
   * @param filtros
   */
  async listaAlunos(filtros: { escolaId: string, turmaId: string }): Promise<Aluno[]> {
    if (!filtros || !filtros.escolaId || !filtros.turmaId) throw new Error('Parâmetros inválidos');
    return this.alunos
      .filter(aluno => {
        if (filtros.escolaId && filtros.escolaId != aluno.escolaId) {
          return false;
        }
        if (filtros.turmaId && filtros.turmaId != aluno.turmaId) {
          return false;
        }
        return true;
      })
      .map(aluno => new Aluno(aluno));
  }

  /**
   * Salva uma escola.
   * @param escola dados da escola.
   */
  async salvaEscola(escola: Escola) {
    let _escola = escola.id ? this.escolas.find(_escola => _escola.id == escola.id) : null;
    if (!_escola) {
      _escola = new Escola(escola);
      _escola.id = `${this.lastEscolaId++}`;
      this.escolas.push(_escola);
    } else {
      _escola.deserialize(escola);
    }
  }

  /**
   * Salva uma turma.
   * @param turma dados da turma.
   */
  async salvaTurma(turma: Turma) {
    let _turma = turma.id ? this.turmas.find(_turma => _turma.id == turma.id) : null;
    if (!_turma) {
      _turma = new Turma(turma);
      _turma.id = `${this.lastTurmaId++}`;
      this.turmas.push(_turma);
    } else {
      _turma.deserialize(turma);
    }
  }

  /**
   * Salva um aluno.
   * @param aluno dados do aluno.
   */
  async salvaAluno(aluno: Aluno) {
    let _aluno = aluno.id ? this.alunos.find(_turma => _turma.id == aluno.id) : null;
    if (!_aluno) {
      _aluno = new Aluno(aluno);
      _aluno.id = `${this.lastAlunoId++}`;
      this.alunos.push(_aluno);
    } else {
      _aluno.deserialize(aluno);
    }
  }

  /**
   * Busca uma escola.
   * @param escolaId
   */
  async buscaEscola(escolaId: string): Promise<{ escola: Escola, turmas: Turma[] }> {
    let escola = this.escolas.find(escola => escola.id == escolaId);
    if (!escola) throw new Error('Escola não encontrada');
    let turmas = this.turmas.filter(turma => escola.id == turma.escolaId);
    return { escola, turmas };
  }

  /**
   * Busca uma turma.
   * @param turmaId
   */
  async buscaTurma(turmaId: string): Promise<{ escola: Escola, turma: Turma, alunos: Aluno[] }> {
    let turma = this.turmas.find(turma => turma.id == turmaId);
    if (turma) throw new Error('Turma não encontrada');
    let alunos = this.alunos.filter(aluno => turma.id == aluno.turmaId);
    let escola = this.escolas.find(escola => turma.escolaId == escola.id);
    return { escola, turma, alunos };
  }

  /**
 * Busca um aluno.
 * @param alunoId
 */
  async buscaAluno(alunoId: string) {
    let aluno = this.alunos.find(aluno => aluno.id == alunoId);
    if (aluno) throw new Error('Aluno(a) não encontrado(a)');
    let escola = this.escolas.find(escola => aluno.escolaId == escola.id);
    let turma = this.turmas.find(turma => aluno.turmaId == turma.id);
    return { escola, turma, aluno };
  }

}
