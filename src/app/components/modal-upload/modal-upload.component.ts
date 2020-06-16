import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

  constructor(
    public subirArchivoService: SubirArchivoService,
    public modalUploadServices: ModalUploadService
  ) { }

  ngOnInit() {
  }




  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this.modalUploadServices.ocultarModal();
  }

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
  subirImagen() {
    this.subirArchivoService
      .subirArchivo( this.imagenSubir, this.modalUploadServices.tipo, this.modalUploadServices.id)
        .then( resp => {
          this.modalUploadServices.notificacion.emit( resp );
          this.cerrarModal();
        })
        .catch( err => {
          console.log('Error en la carga');
        });
  }

}
