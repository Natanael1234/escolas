import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Escola } from '../../models/escola.model';
import { EscolasProvider } from '../../providers/escolas/escolas';
import FuzzySearch from 'fuzzy-search';
import { stringify } from '@angular/core/src/util';

@IonicPage()
@Component({
  selector: 'page-escolas',
  templateUrl: 'escolas.html'
})
export class EscolasPage {

  loading: boolean = false;
  error: string;
  escolas: Escola[];
  escolasFiltradas: Escola[];
  textoBusca = '';

  constructor(public escolasProvider: EscolasProvider) {
    this.carregaEscolas();
  }

  async carregaEscolas() {
    this.loading = true;
    this.error = null;
    try {
      this.escolas = await this.escolasProvider.carregaEscolas();
      console.log(this.textoBusca);
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

