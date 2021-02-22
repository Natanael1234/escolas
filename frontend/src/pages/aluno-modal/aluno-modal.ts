import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ViewController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Aluno } from '../../models/aluno.model';
import { EscolasProvider } from '../../providers/escolas/escolas.provider';

@Component({
  selector: 'page-aluno-modal',
  templateUrl: 'aluno-modal.html',
})
export class AlunoModalPage {

  editMode = false;
  aluno: Aluno;
  form: FormGroup;
  loading = false;
  error: string;

  disableClose = false;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    public viewCtrl: ViewController,
    public escolasProvider: EscolasProvider
  ) {
    this.aluno = this.navParams.data.aluno;
    this.form = new FormGroup({
      id: new FormControl(this.aluno.id, { validators: [Validators.required] }),
      matricula: new FormControl(this.aluno.matricula, { validators: [Validators.required] }),
      nome: new FormControl(this.aluno.nome, { validators: [Validators.required] }),
      cpf: new FormControl(this.aluno.cpf, { validators: [Validators.required] }),
      logradouro: new FormControl(this.aluno.logradouro, { validators: [Validators.required] }),
      numero: new FormControl(this.aluno.numero, { validators: [Validators.required] }),
      complemento: new FormControl(this.aluno.complemento, { validators: [] }),
      bairro: new FormControl(this.aluno.bairro, { validators: [Validators.required] }),
      cidade: new FormControl(this.aluno.cidade, { validators: [Validators.required] }),
      estado: new FormControl(this.aluno.estado, { validators: [Validators.required] }),
      cep: new FormControl(this.aluno.cep, { validators: [Validators.required] }),
      fone: new FormControl(this.aluno.fone, { validators: [Validators.required] }),
      email: new FormControl(this.aluno.email, { validators: [Validators.required] }),
      serie: new FormControl(this.aluno.serie, { validators: [Validators.required] }),
      turmaId: new FormControl(this.aluno.turmaId, { validators: [Validators.required] }),
      escolaId: new FormControl(this.aluno.escolaId, { validators: [Validators.required] }),
    });
    this.setEditMode(false);
  }

  setEditMode(enabled:boolean) {
    this.editMode = enabled;
  }

  async closeModal() {
    this.viewCtrl.dismiss({ salvo: false });
  }

  async salvar() {
    this.disableClose = true;
    this.loading = true;
    try {
      let aluno = new Aluno(this.form.getRawValue());
      await this.escolasProvider.salvaAluno(aluno);
      this.error = null;
      this.viewCtrl.dismiss({ salvo: true });
      this.setEditMode(false);
    } catch (error) {
      this.error = error.message || 'Falha ao salvar aluno';
    }
    this.loading = false;
  }

}
