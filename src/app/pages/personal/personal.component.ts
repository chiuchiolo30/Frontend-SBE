import { Component, OnInit } from '@angular/core';
import { Personal } from '../../models/personal.model';
import { PersonalService } from '../../services/service.index';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styles: []
})
export class PersonalComponent implements OnInit {

  cargando: boolean = true;
  totalRegistro: number = 0;
  hasta: number = 5;
  desde: number = 0;
  personales: Personal[] = [];
  role: string = this.personalService.usuario.role;


  constructor(
    public personalService: PersonalService
  ) {  }

  ngOnInit() {
    this.cargarPersonal();
  }



// ============================================================================
// Buscar personal por concidencia
// ============================================================================
  buscarPersonal( termino: string ) {

    if ( termino.length <= 0 || termino.trim() === '' ) {
      this.cargarPersonal();
      return;
    }
    this.personalService.buscarPersonal( termino )
          .subscribe( resp => {
              this.totalRegistro = resp.length;
              this.personales = resp;
          });

  }

  // ============================================================================
  // Paginación
  // ============================================================================
  cambiarDesde( valor: number ) {
    const desde = this.desde + valor;
    if ( desde >= this.totalRegistro ) {
      return;
    }
    if ( desde < 0 ) {
      return;
    }
    this.desde += valor;
    this.cargarPersonal();
  }

  // ============================================================================
  // Cargar todo el personal
  // ============================================================================
    cargarPersonal() {
      this.cargando = true;
      this.personalService.cargarPersonal(this.hasta, this.desde)
              .subscribe( (resp: any) => {
                  this.totalRegistro = resp.total;
                  this.personales = resp.personal;
                  this.cargando = false;
              });
    }


}
