import { Component, OnInit } from '@angular/core';
import { AlumnoService } from 'src/app/services/service.index';
import { Alumno } from 'src/app/models/alumno.model';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styles: []
})
export class AlumnosComponent implements OnInit {

  cargando: boolean = true;
  totalRegistro: number = 0;
  hasta: number = 5;
  desde: number = 0;

  alumnos: Alumno[] = [];

  constructor(
    public alumnoServices: AlumnoService
  ) { }

  ngOnInit() {
    this.cargarAlumnos();

  }



  // ============================================================================
  // Carga los alumnos
  // ============================================================================
  cargarAlumnos() {
    this.cargando = true;
    this.alumnoServices.cargarAlumnos(this.hasta, this.desde)
            .subscribe( (resp: any) => {
                this.totalRegistro = resp.total;
                this.alumnos = resp.alumnos;
                this.cargando = false;
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
    this.cargarAlumnos();
  }

  // ============================================================================
// Buscar alumnos por concidencia
// ============================================================================
buscarAlumnos( termino: string ) {

  if ( termino.length <= 0 || termino.trim() === '' ) {
    this.cargarAlumnos();
    return;
  }
  this.alumnoServices.buscarAlumnos( termino )
        .subscribe( alumnos => {
            this.totalRegistro = alumnos.length;
            this.alumnos = alumnos;
        });

}
}
