import { Component, OnInit } from '@angular/core';
import { Escola } from 'src/app/models/escola.model';
import { EscolasService } from 'src/app/services/escolas.service';
import FuzzySearch from 'fuzzy-search';

@Component({
  selector: 'app-escolas',
  templateUrl: './escolas.page.html',
  styleUrls: ['./escolas.page.scss'],
})
export class EscolasPage {

  loading: boolean = false;
  error: string;
  escolas: Escola[];
  escolasFiltradas: Escola[];
  textoBusca = '';

  constructor(public escolasProvider: EscolasService) { }

  ionViewDidEnter() {
    this.carregaEscolas();
  }

  async carregaEscolas() {
    this.loading = true;
    this.error = null;
    try {
      this.escolas = await this.escolasProvider.listaEscolas();
      this.filtraEscolas();
    } catch (error) {
      this.error = 'Falha ao buscar escolas.';
    }
    this.loading = false;
  }

  filtraEscolas() {
    if (this.textoBusca) {
      const searcher = new FuzzySearch(this.escolas, ['nome', 'email', 'fone'], {
        caseSensitive: false,
      });
      this.escolasFiltradas = searcher.search(this.textoBusca);
    } else {
      this.escolasFiltradas = this.escolas;
    }
  }

}
