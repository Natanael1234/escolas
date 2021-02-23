import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Escola } from 'src/app/models/escola.model';
import { Turma } from 'src/app/models/turma.model';
import { EscolasService } from 'src/app/services/escolas.service';

@Component({
  selector: 'app-escola',
  templateUrl: './escola.page.html',
  styleUrls: ['./escola.page.scss'],
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
    public escolasProvider: EscolasService
  ) {
    this.escolaId = this.activatedRoute.snapshot.paramMap.get('escolaId');

    this.carregaEscola();
  }

  async carregaEscola() {
    this.loading = true;
    this.error = null;
    try {
      console.log('escolaId', this.escolaId);
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
