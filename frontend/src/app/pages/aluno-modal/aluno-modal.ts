import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Escola } from 'src/app/models/escola.model';
import { Turma } from 'src/app/models/turma.model';
import { EscolasService } from 'src/app/services/escolas.service';
import { estados } from 'src/app/utils/estados-brasileiros';
import { Aluno } from '../../models/aluno.model';

@Component({
  selector: 'page-aluno-modal',
  templateUrl: 'aluno-modal.html',
})
export class AlunoModalPage {

  estados = estados;

  aluno: Aluno;
  form: FormGroup;
  loading = false;
  error: string;
  escolas: Escola[] = [];
  turmas: Turma[] = [];

  disableClose = false;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    public escolasProvider: EscolasService
  ) {
    // objeto aluno recebido por parâmetro
    this.aluno = this.navParams.data.aluno;
    // carrega os dados do formulário.
    this.loadFormData();
  }

  /**
   * Copia os dados do aluno recebido para o formulário.
   */
  async loadFormData() {
    let form = new FormGroup({
      id: new FormControl(this.aluno.id, { validators: [] }),
      matricula: new FormControl(this.aluno.matricula, { validators: [Validators.required] }),
      nome: new FormControl(this.aluno.nome, { validators: [Validators.required] }),
      cpf: new FormControl(this.aluno.cpf, { validators: [Validators.required] }),
      logradouro: new FormControl(this.aluno.logradouro, { validators: [Validators.required] }),
      numero: new FormControl(this.aluno.numero, { validators: [Validators.required] }),
      complemento: new FormControl(this.aluno.complemento, { validators: [] }),
      bairro: new FormControl(this.aluno.bairro, { validators: [Validators.required] }),
      cidade: new FormControl(this.aluno.cidade, { validators: [Validators.required] }),
      estado: new FormControl(this.aluno.estado, { validators: [Validators.required] }),
      cep: new FormControl(this.aluno.cep || '', { validators: [Validators.required] }),
      fone: new FormControl(this.aluno.fone, { validators: [Validators.required] }),
      email: new FormControl(this.aluno.email, { validators: [Validators.required] }),
      serie: new FormControl(this.aluno.serie, { validators: [Validators.required] }),
      turmaId: new FormControl(this.aluno.turmaId, { validators: [Validators.required] }),
      escolaId: new FormControl(this.aluno.escolaId, { validators: [Validators.required] }),
    });
    this.form = form;
    await this.listaEscolas();
  }
  async updateFormData() {
    this.form.controls.id.setValue(this.aluno?.id);
    this.form.controls.matricula.setValue(this.aluno?.matricula);
    this.form.controls.nome.setValue(this.aluno?.nome);
    this.form.controls.cpf.setValue(this.aluno?.cpf);
    this.form.controls.logradouro.setValue(this.aluno?.logradouro);
    this.form.controls.numero.setValue(this.aluno?.numero);
    this.form.controls.complemento.setValue(this.aluno?.complemento);
    this.form.controls.bairro.setValue(this.aluno?.bairro);
    this.form.controls.cidade.setValue(this.aluno?.cidade);
    this.form.controls.estado.setValue(this.aluno?.estado);
    this.form.controls.cep.setValue(this.aluno?.cep);
    this.form.controls.fone.setValue(this.aluno?.fone);
    this.form.controls.email.setValue(this.aluno?.email);
    this.form.controls.serie.setValue(this.aluno?.serie);
    // this.form.controls.turmaId.setValue(this.aluno?.turmaId);
    // this.form.controls.escolaId.setValue(this.aluno?.escolaId);
    this.form.updateValueAndValidity();
  }

  /**
   * Carrega a lista de escolas.
   */
  async listaEscolas() {
    try {
      let escolaId = this.form.controls.escolaId.value;
      let turmaId = this.form.controls.turmaId.value;
      this.escolas = await this.escolasProvider.listaEscolas();
      if (escolaId) {
        this.turmas = await this.escolasProvider.listaTurmas({ escolaId });
      } else {
        this.turmas = [];
      }
    } catch (error) {
      console.error(error)
      this.error = error.message || 'Erro ao carregar dados do formulário';
    }
  }

  /**
   * Recarrega a lista de turmas quando o usuário selecionar uma escola.
   * @param escolaId id de escola para filtragem das turmas por escola.
   */
  async listaTurmas(escolaId: string) {
    try {
      this.turmas = await this.escolasProvider.listaTurmas({ escolaId });
      // verifica se a turma selecionada está na nova lista de turmas. Caso contrário deseleciona a turma
      let turma = this.turmas.find(turma => turma.id == this.form.controls.turmaId.value);
      if (!turma) {
        this.form.controls.turmaId.setValue(null);
      }
    } catch (error) {
      this.error = error.message || 'Erro ao carregar dados do formulário';
    }
  }

  /** Fecha a modal sem salvar o aluno */
  async closeModal() {
    this.modalController.dismiss({ salvo: false });
  }

  /** Salva o aluno */
  async salvar() {
    this.disableClose = true;
    this.loading = true;
    try {
      let aluno = new Aluno(this.form.getRawValue());
      await this.escolasProvider.salvaAluno(aluno);
      this.error = null;
      this.modalController.dismiss({ salvo: true });
    } catch (error) {
      this.error = error.message || 'Falha ao salvar aluno';
    }
    this.loading = false;
  }

  async buscarAlunoPorCPF() {
    try {
      let aluno = await this.escolasProvider.buscaAlunoPorCPF(this.form.controls.cpf.value);
      this.aluno = aluno;
      this.updateFormData();
    } catch (error) {
      alert(error.message || 'Falha ao buscar aluno');
    }
  }

  /** Comparador necessário para a selação automática nas selects */
  compareFn(value1, value2): boolean {
    return value1 == value2;
  }

}
