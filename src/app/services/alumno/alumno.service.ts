import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Alumno } from 'src/app/models/alumno.model';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  token: string = this.usuarioService.token;

  constructor(
    public http: HttpClient,
    public usuarioService: UsuarioService
  ) { }
// ============================================================================
// Método que llama a la función Obtener alumnos del BackEnd
// ============================================================================
  cargarAlumnos( hasta: number, desde: number ) {
    const url = `${ URL_SERVICIOS }/alumnos?hasta=${ hasta }&desde=${ desde }`;
    return this.http.get( url );
  }
// ============================================================================
// Método que llama a la función Buscar por colección del BackEnd
// ============================================================================
  buscarAlumnos( termino: string ) {
    const url = `${ URL_SERVICIOS }/busqueda/coleccion/alumnos/${ termino }`;
    return this.http.get( url )
        .pipe( map( (resp: any) => resp.busqueda));
  }

// ============================================================================
// Mètodo para guardar y actualizar un alumno
// ============================================================================

guardarAlumno( alumno: Alumno ) {
  if ( alumno.id ) {
    // Actualiza
    const url = `${URL_SERVICIOS}/alumnos/${alumno.id}?token=${ this.token }`;
    return this.http.put( url, alumno )
            .pipe( map( (resp: any) => {
              Swal.fire('Alumno actualizado', alumno.nombre, 'success');
              return resp.alumno[0];
            }));

    } else {
      // Crea
    const url = `${URL_SERVICIOS}/alumnos?token=${ this.token }`;
    return this.http.post( url, alumno )
            .pipe( map( (resp: any) => {
                Swal.fire('Alumno creado', alumno.nombre, 'success');
                return resp.newAlumno;
            }));
  }
}

// ============================================================================
// Cargar un Alumno mediante su ID
// ============================================================================
cargarUnAlumno( id: string ) {
  const url = `${URL_SERVICIOS}/alumnos/${ id }`;
  return this.http.get( url )
    .pipe( map( (resp: any) => resp.alumno ));
}



}
