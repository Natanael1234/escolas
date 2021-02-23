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

  ionViewDidEnter() {
    if (this.escolaId) {
      this.carregaEscola();
    } else {
      this.criaEscola();
    }
  }

  async carregaEscola() {
    this.loading = true;
    this.error = null;
    try {
      let { escola, turmas } = await this.escolasProvider.buscaEscola(this.escolaId);
      this.escola = escola;
      this.loadForm();
      this.turmas = turmas;
      this.error = '';
    } catch (error) {
      this.error = error.message || 'Falha ao buscar escola.';
    }
    this.loading = false;
  }

  async criaEscola() {
    let escola = new Escola();
    this.escola = escola;
    this.loadForm();
  }

  loadForm() {
    if (this.escola)
      this.form = new FormGroup({
        id: new FormControl(this.escola.id, { validators: [] }),
        nome: new FormControl(this.escola.nome, { validators: [Validators.required] }),
        logradouro: new FormControl(this.escola.logradouro, { validators: [Validators.required] }),
        numero: new FormControl(this.escola.numero, { validators: [Validators.required] }),
        bairro: new FormControl(this.escola.bairro, { validators: [Validators.required] }),
        cidade: new FormControl(this.escola.cidade, { validators: [Validators.required] }),
        estado: new FormControl(this.escola.estado, { validators: [Validators.required] }),
        cep: new FormControl(this.escola.cep, { validators: [Validators.required] }),
        complemento: new FormControl(this.escola.complemento, { validators: [] }),
        fone: new FormControl(this.escola.fone, { validators: [Validators.required] }),
        email: new FormControl(this.escola.email, { validators: [Validators.required] }),
        ativa: new FormControl(this.escola.ativa, { validators: [Validators.required] })
      });
  }

  async salvarFormulario() {
    try {
      let escola = new Escola(this.form.getRawValue());
      this.escolasProvider.salvaEscola(escola);
      this.escola = escola;
      if (!this.escolaId) {
        this.escolaId = this.escola.id;
        // sai da página de criação e vai para o formulário normal.
        this.router.navigate(['/escola', escola.id], { replaceUrl: true });
        this.turmas = [];
      }
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
