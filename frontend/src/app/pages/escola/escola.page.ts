import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Escola } from 'src/app/models/escola.model';
import { Turma } from 'src/app/models/turma.model';
import { EscolasService } from 'src/app/services/escolas.service';
import { estados } from 'src/app/utils/estados-brasileiros';

@Component({
  selector: 'app-escola',
  templateUrl: './escola.page.html',
  styleUrls: ['./escola.page.scss'],
})
export class EscolaPage {

  form: FormGroup;
  error: string;
  loading: boolean = false;
  escolaId: string;
  escola: Escola;
  turmas: Turma[] = [];
  estados = estados;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public escolasProvider: EscolasService
  ) {
    this.escolaId = this.activatedRoute.snapshot.paramMap.get('escolaId');
  }

  ionViewDidEnter () {
    this.carregaEscola();
  }

  async carregaEscola() {
    this.loading = true;
    this.error = null;
    try {
      console.log('escolaId', this.escolaId);
      let { escola, turmas } = await this.escolasProvider.buscaEscola(this.escolaId);
      this.escola = escola;
      this.form = new FormGroup({
        id: new FormControl(escola.id, { validators: [] }),
        nome: new FormControl(escola.nome, { validators: [Validators.required] }),
        logradouro: new FormControl(escola.logradouro, { validators: [Validators.required] }),
        numero: new FormControl(escola.numero, { validators: [Validators.required] }),
        bairro: new FormControl(escola.bairro, { validators: [Validators.required] }),
        cidade: new FormControl(escola.cidade, { validators: [Validators.required] }),
        estado: new FormControl(escola.estado, { validators: [Validators.required] }),
        cep: new FormControl(escola.cep, { validators: [Validators.required] }),
        complemento: new FormControl(escola.complemento, { validators: [] }),
        fone: new FormControl(escola.fone, { validators: [Validators.required] }),
        email: new FormControl(escola.email, { validators: [Validators.required] }),
        ativa: new FormControl(escola.ativa, { validators: [Validators.required] })
      });
      this.turmas = turmas;
      this.error = '';
    } catch (error) {
      this.error = error.message || 'Falha ao buscar escola.';
    }
    this.loading = false;
  }

  salvarFormulario() {
    try {
      let escola = new Escola(this.form.getRawValue());
      this.escolasProvider.salvaEscola(escola);
      this.escola = escola;
    } catch (error) {
      alert(error.message || 'Falha ao salvar escola.');
    }
  }

  resetarFormulario() {
    if (this.escola) {
      this.form.controls.id.setValue(this.escola.id);
      this.form.controls.nome.setValue(this.escola.nome);
      this.form.controls.logradouro.setValue(this.escola.logradouro);
      this.form.controls.numero.setValue(this.escola.numero);
      this.form.controls.bairro.setValue(this.escola.bairro);
      this.form.controls.cidade.setValue(this.escola.cidade);
      this.form.controls.estado.setValue(this.escola.estado);
      this.form.controls.cep.setValue(this.escola.cep);
      this.form.controls.complemento.setValue(this.escola.complemento);
      this.form.controls.fone.setValue(this.escola.fone);
      this.form.controls.email.setValue(this.escola.email);
      this.form.controls.ativa.setValue(this.escola.ativa);
    }
  }

  /** Comparador necessário para a selação automática nas selects */
  compareFn(value1, value2): boolean {
    return value1 == value2;
  }

}
