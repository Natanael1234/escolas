import { Injectable } from '@angular/core';
import { Aluno } from '../models/aluno.model';
import { Escola } from '../models/escola.model';
import { Turma } from '../models/turma.model';
import { ArmazenamentoService } from './armazenamento.service';

@Injectable({
  providedIn: 'root'
})
export class EscolasService {

  constructor(public db: ArmazenamentoService) {
    let escolas = this.db.getEscolas();
    if (!escolas?.length) {
      this.db.populate();
    }
  }

  /**
   * Lista escolas.
   * @param filtros
   */
  async listaEscolas(): Promise<Escola[]> {
    return this.db.getEscolas().map(escola => new Escola(escola));
  }

  /**
   * Lista turmas.
   * @param escolaId
   */
  async listaTurmas(filtros: { escolaId: string }): Promise<Turma[]> {
    if (!filtros || !filtros.escolaId) throw new Error('Parâmetros inválidos');
    return this.db
      .getTurmas()
      .filter(turma => turma.escolaId == filtros.escolaId);
  }

  /**
   * Lista alunos.
   * @param filtros
   */
  async listaAlunos(filtros: { escolaId: string, turmaId: string }): Promise<Aluno[]> {
    if (!filtros || !filtros.escolaId || !filtros.turmaId) throw new Error('Parâmetros inválidos');
    return this.db
      .getAlunos()
      .filter(aluno => {
        if (filtros.escolaId && filtros.escolaId != aluno.escolaId) {
          return false;
        }
        if (filtros.turmaId && filtros.turmaId != aluno.turmaId) {
          return false;
        }
        return true;
      });
  }

  /**
   * Salva uma escola.
   * @param escola dados da escola.
   */
  async salvaEscola(escola: Escola) {
    return this.db.salvaEscola(escola);
  }

  /**
   * Salva uma turma.
   * @param turma dados da turma.
   */
  async salvaTurma(turma: Turma) {
    return this.db.salvaTurma(turma);
  }

  /**
   * Salva um aluno.
   * @param aluno dados do aluno.
   */
  async salvaAluno(aluno: Aluno) {
    return this.db.salvaAluno(aluno);
  }

  /**
   * Busca uma escola.
   * @param escolaId
   */
  async buscaEscola(escolaId: string): Promise<{ escola: Escola, turmas: Turma[] }> {
    // escola
    let escola = this.db.getEscola(escolaId);
    if (!escola) throw new Error('Escola não encontrada');
    // turmas da escola
    let turmas = this.db.getTurmas().filter(turma => escola.id == turma.escolaId);
    return { escola, turmas };
  }

  /**
   * Busca uma turma.
   * @param turmaId
   */
  async buscaTurma(turmaId: string): Promise<{ escola: Escola, turma: Turma, alunos: Aluno[] }> {
    if (!turmaId) throw new Error('Turma inválida');
    // turma
    let turma = this.db.getTurma(turmaId);
    if (!turma) throw new Error('Turma não encontrada');
    // alunos da turma
    let alunos = this.db.getAlunos().filter(aluno => {
      return turma.id == aluno.turmaId;
    });
    // escola da turma
    let escola = this.db.getEscola(turma.escolaId);
    return { escola, turma, alunos };
  }

  /**
   * Busca um aluno.
   * @param alunoId
   */
  async buscaAluno(alunoId: string) {
    // aluno
    let aluno = this.db.getAluno(alunoId);
    if (aluno) throw new Error('Aluno(a) não encontrado(a)');
    // escola do aluno
    let escola = this.db.getEscola(aluno.escolaId);
    // turma do aluno
    let turma = this.db.getTurma(aluno.turmaId);
    return { escola, turma, aluno };
  }

  /**
 * Busca um aluno por CPF.
 * @param cpf
 */
  async buscaAlunoPorCPF(cpf: string) {
    let aluno = this.db.getAlunos().find(aluno => {
      let cpf1 = (aluno.cpf || '').replace(/\D/g, '');
      let cpf2 = (cpf || '').replace(/\D/g, '');
      return cpf1 == cpf2;
    });
    if (!aluno) throw new Error('Aluno(a) não encontrado(a)');
    return aluno;
  }

}
