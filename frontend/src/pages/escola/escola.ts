import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Escola } from '../../models/escola.model';

@IonicPage()
@Component({
  selector: 'page-escola',
  templateUrl: 'escola.html',
})
export class EscolaPage {

  escola:Escola;

  constructor() {
  }

}
