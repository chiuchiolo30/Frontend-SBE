import { Injectable } from '@angular/core';

import { Usuario } from 'src/app/models/usuario.model';

import { HttpClient } from '@angular/common/http';

import { URL_SERVICIOS } from 'src/app/config/config';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { UsuarioService } from '../usuario/usuario.service';
import { Personal } from '../../models/personal.model';


@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  usuario: Usuario = this.usuarioServices.usuario;
  token: string = this.usuarioServices.token;

  constructor(
    public http: HttpClient,
    public router: Router,
    public usuarioServices: UsuarioService,
    public subirArchivoServices: SubirArchivoService
  ) { }




// ============================================================================
// Cargar un Personal mediante su ID
// ============================================================================
cargarUnPersonal( id: string ) {
  const url = `${URL_SERVICIOS}/personal/${ id }`;
  return this.http.get( url )
    .pipe( map( (resp: any) => resp.personal ));
}
// ============================================================================
// Cargar todo Personal
// ============================================================================
cargarPersonal( hasta: number = 5, desde: number = 0) {
  const url = `${URL_SERVICIOS}/personal?hasta=${hasta}&desde=${desde}`;
  return this.http.get( url );
}
// ============================================================================
// Buscar personal por concidencia
// ============================================================================
buscarPersonal( termino: string ) {
  const url = `${URL_SERVICIOS}/busqueda/coleccion/personales/${termino}`;
  return this.http.get( url )
    .pipe( map( (resp: any) => resp.busqueda ));
}

// ============================================================================
// Mètodo para guardar y actualizar un personal
// ============================================================================

 guardaPersonal( personal: Personal ) {
  if ( personal.id ) {
    // Actualiza
    const url = `${URL_SERVICIOS}/personal/${personal.id}?token=${ this.token }`;
    return this.http.put( url, personal )
            .pipe( map( (resp: any) => {
              Swal.fire('Personal actualizado', personal.nombre, 'success');
              return resp.personal[0];
            }));

    } else {
      // Crea
    const url = `${URL_SERVICIOS}/personal?token=${ this.token }`;
    return this.http.post( url, personal )
            .pipe( map( (resp: any) => {
                Swal.fire('Personal creado', personal.nombre, 'success');
                return resp.newPersonal;
            }));
  }
}

// ============================================================================
// Borrar un personal
// ============================================================================

borrarUnPersonal( personal: Personal) {
  const url = `${URL_SERVICIOS}/personal/${personal.id}?token=${ this.token }`;
  return this.http.delete( url )
        .pipe( map( (resp: any) => {
          Swal.fire('Personal eliminado', personal.nombre, 'success');
          return resp.ok;
        }));
}
}
