import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

 ajustes: Ajustes = {
   temaUrl: 'assets/css/colors/default.css',
      tema: 'default'
 };


  constructor(
    @Inject(DOCUMENT) private document // para manejar el DOM
  ) {
    this.cargarAjustes();
   }

  guardarAgustes() {
    localStorage.setItem('ajustes', JSON.stringify( this.ajustes) );
  }

  cargarAjustes() {
    if ( localStorage.getItem('ajustes') ) {
        this.ajustes = JSON.parse( localStorage.getItem('ajustes') );
        this.aplicarTema(this.ajustes.tema);
      } else {
        this.aplicarTema(this.ajustes.tema);
    }
  }

  aplicarTema( tema: string) {
    const url = `assets/css/colors/${tema}.css`;
    // manipulando el DOM
    this.document.getElementById('tema').setAttribute('href', url);

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardarAgustes();
  }
}


interface Ajustes {
  temaUrl: string;
     tema: string;
}
