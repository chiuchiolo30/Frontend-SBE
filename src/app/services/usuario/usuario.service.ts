import { Injectable } from '@angular/core';

import { Usuario } from 'src/app/models/usuario.model';

import { HttpClient } from '@angular/common/http';

import { URL_SERVICIOS } from 'src/app/config/config';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Personal } from 'src/app/models/personal.model';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;


  constructor(
    public http: HttpClient,
    public router: Router,
    public subirArchivoServices: SubirArchivoService
  ) {
      this.cargarStorage();
   }
// ============================================================================
// Verificar si el usuario está logeado
// ============================================================================
   estaLogeado() {
     return (this.token.length > 5 ) ? true : false;
   }
// ============================================================================
// Cargar del LocalStorage
// ============================================================================
   cargarStorage() {
     if ( localStorage.getItem('token') ) {
        this.token = localStorage.getItem('token');
        this.usuario = JSON.parse(localStorage.getItem('usuario'));
     } else {
       this.token = '';
       this.usuario = null;
     }

   }
// ============================================================================
// Guardar en el LocalStorage
// ============================================================================
   guardarStorage( id: string, token: string, usuario: Usuario ) {
    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify(usuario) );

    this.usuario = usuario;
    this.token = token;
   }
// ============================================================================
// Logout
// ============================================================================
   logout() {
     this.usuario = null;
     this.token = '';
     localStorage.removeItem('usuario');
     localStorage.removeItem('token');
     localStorage.removeItem('id');
     this.router.navigate(['/login']);
   }
// ============================================================================
// Login con cuenta de Google
// ============================================================================
  loginGoogle( token: string ) {
    const url = `${URL_SERVICIOS}/login/google`;
    return this.http.post( url, { token })
                  .pipe( map( (resp: any) => {
                    this.guardarStorage( resp.id, resp.token, resp.user);
                    return true;
                  }));

  }
// ============================================================================
// Login normal
// ============================================================================
   login( usuario: Usuario, recordar: boolean = false) {

        if ( recordar ) {
          localStorage.setItem('email', usuario.email);
        } else {
          localStorage.removeItem('email');
        }

        const url = `${URL_SERVICIOS}/login`;
        return this.http.post( url, usuario )
                      .pipe(
                        map( (resp: any) => {
                             this.guardarStorage(resp.id, resp.token, resp.user);
                             return true;
                        })
                      );
   }
// ============================================================================
// Actualizar usuario
// ============================================================================
   crearUsuario( usuario: Usuario ) {
        const url = `${URL_SERVICIOS}/usuario`;
        return this.http.post( url, usuario );
   }
// ============================================================================
// Actualizar imagen
// ============================================================================
   actualizarUsuario( usuario: Usuario ) {
        const url = `${URL_SERVICIOS}/usuario/${ usuario.id }?token=${ this.token }`;
        return this.http.put( url, usuario )
                  .pipe( map((resp: any) => {
                    if ( usuario.id === this.usuario.id) {
                    const usuarioDB = resp.usuario[0];
                    this.guardarStorage(usuarioDB.id, this.token, usuarioDB);
                    }
                    Swal.fire(
                      'Usuario actualizado',
                        usuario.nombre,
                      'success'
                    );
                    return true;
                  }));
   }
// ============================================================================
// Cambiar imagen
// ============================================================================
cambiarImagen( archivo: File, id: string ) {

  this.subirArchivoServices.subirArchivo( archivo, 'usuarios', id )
                .then( (resp: any) => {
                  this.usuario.img = resp.userUpdate.img;
                  Swal.fire(
                    'Imagen actualizada',
                     resp.userUpdate.nombre,
                    'success'
                  );
                  this.guardarStorage( id, this.token, this.usuario );
                })
                .catch( resp => {
                  console.log(resp);
                });
}

// ============================================================================
// Cargar usuarios
// ============================================================================
cargarUsuarios( hasta: number = 5, desde: number = 0) {
  const url = `${URL_SERVICIOS}/usuario?hasta=${hasta}&desde=${desde}`;
  return this.http.get( url );
}
// ============================================================================
// Buscar usuarios por concidencia
// ============================================================================
buscarUsuarios( termino: string ) {
  const url = `${URL_SERVICIOS}/busqueda/coleccion/usuarios/${termino}`;
  return this.http.get( url )
    .pipe( map( (resp: any) => resp.busqueda ));
}

// ============================================================================
// Borrar un Usuario
// ============================================================================

borrarUsuario( id: string ) {
  const url = `${URL_SERVICIOS}/usuario/${ id }?token=${ this.token }`;
  return this.http.delete( url )
          .pipe( map( resp => true));
}

}
