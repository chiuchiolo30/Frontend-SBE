import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlumnoService, SubirArchivoService, AcuerdoService } from '../../services/service.index';
import { Alumno } from '../../models/alumno.model';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Acuerdo } from 'src/app/models/acuerdo';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styles: []
})
export class AlumnoComponent implements OnInit {

  alumno: Alumno = new Alumno();
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

  acuerdos: Acuerdo[] = [];


  constructor(
    public alumnoService: AlumnoService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public subirArchivoServices: SubirArchivoService,
    public acuerdoServices: AcuerdoService
  ) {
    activatedRoute.params.subscribe( params => {
      const id = params.id;
      if ( id !== 'nuevo' ) {
        this.cargarUnAlumno(id);
      }
    });
   }


  ngOnInit() {
    this.cargarAcuerdos();
  }
// ============================================================================
// Método para guardar ó actualizar un alumno
// ============================================================================
guardarAlumno( f: NgForm ) {
  if ( f.invalid ) {
    return;
  }
  this.alumnoService.guardarAlumno( this.alumno )
        .subscribe( alumno => {
          this.alumno.id = alumno.id;
          console.log(alumno);

          console.log(alumno.id);

          this.router.navigate(['/alumno', alumno.id]);
        });
}

// ============================================================================
// Método para cargar un alumno a editar
// ============================================================================
cargarUnAlumno( id: string ) {
  this.alumnoService.cargarUnAlumno( id )
        .subscribe( alumno => this.alumno = alumno );
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

  this.subirArchivoServices.subirArchivo( this.imagenSubir, 'alumnos', this.alumno.id )
                .then( (resp: any) => {
                  this.alumno.img = resp.studentUpdate.img;
                  Swal.fire(
                    'Imagen actualizada',
                     resp.studentUpdate.nombre,
                    'success'
                  );
              //    this.guardarStorage( id, this.token, this.usuario );
                })
                .catch( resp => {
                  console.log(resp);
                });
}

// ============================================================================
// Método para cargar los acuerdos en las options del select Empresas
// ============================================================================
cargarAcuerdos() {
  this.acuerdoServices.cargarAcuerdos(999, 0)
        .subscribe( acuerdos => this.acuerdos = acuerdos );
}
}
