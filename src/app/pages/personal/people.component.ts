import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PersonalService } from '../../services/personal/personal.service';

import { Personal } from '../../models/personal.model';
import { Empresa } from '../../models/empresa.model';
import { EmpresaService, UsuarioService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styles: []
})
export class PeopleComponent implements OnInit {
  hasta: number = 999;
  desde: number = 0;
  cargos: string[] = [
    'FAC_REP',
    'FAC_TUTOR',
    'EMP_REP',
    'EMP_TUTOR'
  ];
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

  people: Personal = new Personal();
  empresas: Empresa[] = [];


  constructor(
    public personalService: PersonalService,
    public empresaService: EmpresaService,
    public usuarioServices: UsuarioService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public subirArchivoServices: SubirArchivoService
  ) {

    activatedRoute.params.subscribe( params => {
      const id = params.id;
      if ( id !== 'nuevo' ) {
        this.cargarUnPersonal(id);
      }
    });

  }

  ngOnInit() {

    this.cargarEmpresas();
  }

// ============================================================================
// Método para guardar ó actualizar un personal
// ============================================================================
  guardarPersonal( f: NgForm ) {
    if ( f.invalid ) {
      return;
    }
    this.personalService.guardaPersonal( this.people )
          .subscribe( personal => {
            this.people.id = personal.id;
            console.log(personal);

            console.log(personal.id);

            this.router.navigate(['/people', personal.id]);
          });
  }
// ============================================================================
// Método para cargar las empresas en las options del select Empresas
// ============================================================================
  cargarEmpresas() {
    this.empresaService.cargarEmpresas(this.hasta, this.desde)
          .subscribe( empresas => this.empresas = empresas );
  }
// ============================================================================
// Método para cargar el personal a editar
// ============================================================================
  cargarUnPersonal( id: string ) {
    this.personalService.cargarUnPersonal( id )
          .subscribe( personal => this.people = personal );
  }
// ============================================================================
// Método para seleccionar una imagen
// ============================================================================
  seleccionImagen( archivo: File ) {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }
    if ( archivo.type.indexOf('image') < 0 ) {
      Swal.fire('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;
  }
// ============================================================================
// Método para cambiar una imagen
// ============================================================================
cambiarImagen() {

  this.subirArchivoServices.subirArchivo( this.imagenSubir, 'personal', this.people.id )
                .then( (resp: any) => {
                  this.people.img = resp.personalUpdate.img;
                  Swal.fire(
                    'Imagen actualizada',
                     resp.personalUpdate.nombre,
                    'success'
                  );
              //    this.guardarStorage( id, this.token, this.usuario );
                })
                .catch( resp => {
                  console.log(resp);
                });
}

// ============================================================================
// Método para borrar un personal - hay que revisar
// ============================================================================
borrar() {
  this.personalService.borrarUnPersonal(this.people)
        .subscribe();
}

}
