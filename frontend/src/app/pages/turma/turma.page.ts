import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/models/aluno.model';
import { AlunoModalPage } from '../aluno-modal/aluno-modal';
import FuzzySearch from 'fuzzy-search';
import { Escola } from 'src/app/models/escola.model';
import { Turma } from 'src/app/models/turma.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EscolasService } from 'src/app/services/escolas.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-turma',
  templateUrl: './turma.page.html',
  styleUrls: ['./turma.page.scss'],
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
    public escolasProvider: EscolasService,
    public modalController: ModalController
  ) {
    this.turmaId = this.activatedRoute.snapshot.paramMap.get('turmaId');
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
      const modal = await this.modalController.create({
        component: AlunoModalPage,
        cssClass: 'aluno-modal-page',
        backdropDismiss:false,
        componentProps: {
          aluno,
        }
      });

      return await modal.present();
    }
  }
}
