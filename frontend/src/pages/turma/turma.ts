import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicPage } from 'ionic-angular';
import { Aluno } from '../../models/aluno.model';
import { Escola } from '../../models/escola.model';
import { Turma } from '../../models/turma.model';
import { EscolasProvider } from '../../providers/escolas/escolas.provider';
import FuzzySearch from 'fuzzy-search';
import { AlunoModalPage } from '../aluno-modal/aluno-modal';
import { ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-turma',
  templateUrl: 'turma.html',
})
export class TurmaPage {

  error: string;
  loading: boolean = false;
  turmaId: any;
  escola: Escola;
  alunos: Aluno[];
  alunosFiltrados: Aluno[] = [];
  turma: Turma;
  textoBusca = '';

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public escolasProvider: EscolasProvider,
    public modalController: ModalController
  ) {
    this.activatedRoute.params.subscribe(parameter => {
      this.turmaId = parameter.turmaId;
    })
    this.carregaEscola();
  }

  async carregaEscola() {
    this.loading = true;
    this.error = null;
    try {
      let { escola, turma, alunos } = await this.escolasProvider.buscaTurma(this.turmaId);
      this.escola = escola;
      this.turma = turma;
      this.alunos = alunos;
      this.filtraAlunos();
      this.error = '';
    } catch (error) {
      this.error = error.message || 'Falha ao buscar aluno.';
    }
    this.loading = false;
  }

  filtraAlunos() {
    if (this.textoBusca) {
      const searcher = new FuzzySearch(this.alunos, ['matricula', 'nome', 'email', 'fone'], {
        caseSensitive: false,
      });
      this.alunosFiltrados = searcher.search(this.textoBusca);
    } else {
      this.alunosFiltrados = this.alunos;
    }
  }

  async abrirModalAluno(aluno: Aluno) {
    if (aluno) {
      const modal = await this.modalController.create(AlunoModalPage, { aluno }, { enableBackdropDismiss: false });
      modal.onDidDismiss(ret => {
        if (ret.salvo) this.carregaEscola();
      });
      return await modal.present();
    }
  }

}
