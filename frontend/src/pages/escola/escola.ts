import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicPage } from 'ionic-angular';
import { Escola } from '../../models/escola.model';
import { Turma } from '../../models/turma.model';
import { EscolasProvider } from '../../providers/escolas/escolas.provider';

@IonicPage()
@Component({
  selector: 'page-escola',
  templateUrl: 'escola.html',
})
export class EscolaPage {

  error: string;
  loading: boolean = false;
  escolaId: string;
  escola: Escola;
  turmas: Turma[] = [];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public escolasProvider: EscolasProvider
  ) {
    this.activatedRoute.params.subscribe(parameter => {
      this.escolaId = parameter.escolaId;
    })
    this.carregaEscola();
  }

  async carregaEscola() {
    this.loading = true;
    this.error = null;
    try {
      let { escola, turmas } = await this.escolasProvider.buscaEscola(this.escolaId);
      this.escola = escola;
      this.turmas = turmas;
      this.error = '';
    } catch (error) {
      this.error = 'Falha ao buscar escola.';
    }
    this.loading = false;
  }

}
