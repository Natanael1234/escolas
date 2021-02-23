import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/models/aluno.model';
import { AlunoModalPage } from '../aluno-modal/aluno-modal';
import FuzzySearch from 'fuzzy-search';
import { Escola } from 'src/app/models/escola.model';
import { Turma } from 'src/app/models/turma.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EscolasService } from 'src/app/services/escolas.service';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-turma',
  templateUrl: './turma.page.html',
  styleUrls: ['./turma.page.scss'],
})
export class TurmaPage {

  error: string;
  loading: boolean = false;
  turmaId: any;
  escolaId: any;
  escola: Escola;
  alunos: Aluno[];
  alunosFiltrados: Aluno[] = [];
  turma: Turma;
  textoBusca = '';
  form: FormGroup;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public escolasProvider: EscolasService,
    public modalController: ModalController
  ) {
    this.turmaId = this.activatedRoute.snapshot.paramMap.get('turmaId');
    this.escolaId = this.activatedRoute.snapshot.paramMap.get('escolaId');
    if (!this.turmaId && this.escolaId) {
      this.criaTurma();
    } else {
      this.carregaTurma();
    }
  }

  async criaTurma () {
    this.turma = new Turma();
    this.form = new FormGroup({
      id: new FormControl(null, { validators: [] }),
      numero: new FormControl('', { validators: [] }),
      serie: new FormControl(undefined, { validators: [] }),
      ativa: new FormControl(false, { validators: [] }),
      escolaId: new FormControl(this.escolaId, { validators: [] })
    });
  }

  async carregaTurma() {
    this.loading = true;
    this.error = null;
    try {
      let { escola, turma, alunos } = await this.escolasProvider.buscaTurma(this.turmaId);
      this.escola = escola;
      this.turma = turma;
      this.form = new FormGroup({
        id: new FormControl(turma.id, { validators: [] }),
        numero: new FormControl(turma.numero, { validators: [] }),
        serie: new FormControl(turma.serie, { validators: [] }),
        ativa: new FormControl(turma.ativa, { validators: [] }),
        escolaId: new FormControl(turma.escolaId, { validators: [] })
      });
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
    if (this.turmaId && aluno) {
      const modal = await this.modalController.create({
        component: AlunoModalPage,
        cssClass: 'aluno-modal-page',
        backdropDismiss: false,
        componentProps: { aluno }
      });
      modal.onDidDismiss().then(ret => {
        if (ret.data.salvo) {
          this.carregaTurma();
        }
      })
      return await modal.present();
    }
  }

  criarAluno() {
    if(this.turmaId)
      this.abrirModalAluno(new Aluno({
        turmaId: this.turmaId,
        escolaId: this.escola?.id
      }));
  }

  buscarAluno() { }

  async salvarFormulario() {
    try {
      let turma = new Turma(this.form.getRawValue());
      turma = await this.escolasProvider.salvaTurma(turma);
      this.turma = turma;
      console.log('this.turmaId: ', this.turmaId, ', this.alunos: ', this.alunos, ', this.turma:', this.turma,  ', this.turma.id:', this.turma?.id)
      // se criando turma
      if (!this.turmaId) {
        this.turmaId = turma.id;
        // muda a rota de criação de turma para rota de turma normal.
        this.router.navigate(['/turma', turma.id],{replaceUrl:true});
        // cria lista de alunos
        this.alunos = [];
      }
    } catch (error) {
      alert(error.message || 'Falha ao salvar turma.');
    }
  }

  resetarFormulario() {
    if (this.turma) {
      this.form.controls.id.setValue(this.turma.id);
      this.form.controls.numero.setValue(this.turma.numero);
      this.form.controls.serie.setValue(this.turma.serie);
      this.form.controls.ativa.setValue(this.turma.ativa);
      this.form.controls.escolaId.setValue(this.turma.escolaId);
    }
  }

  /** Comparador necessário para a selação automática nas selects */
  compareFn(value1, value2): boolean {
    return value1 == value2;
  }
}
