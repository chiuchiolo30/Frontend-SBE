import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: []
})
export class AccoutSettingsComponent implements OnInit {

  constructor(
        @Inject(DOCUMENT) private document, // para manejar el DOM      
        public ajustesServices: SettingsService
        ) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor( tema: string, link: any ) {
    this.aplicarCheck(link);
    this.ajustesServices.aplicarTema(tema);
  }

  aplicarCheck( link: any) {
    const selectores: any = this.document.getElementsByClassName('selector');
    for (const ref of selectores) {
      ref.classList.remove('working'); // elimino todas las clases working de los selectores
    }
    link.classList.add('working');
  }
  colocarCheck() {
    const selectores: any = this.document.getElementsByClassName('selector');
    const tema = this.ajustesServices.ajustes.tema;

    for (const ref of selectores) {
      if ( ref.getAttribute('data-theme') === tema ) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
