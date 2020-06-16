import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = `${ URL_SERVICIOS }/img`;

    // si no existe la imagen retorna una imagen por defecto.
    if ( !img ) {
      return `${ url }/usuarios/xxx`;
    }

    // si es una usuario de google retorna la imagen como viene.
    if ( img.indexOf('https') >= 0 ) {
       return img;
    }

    switch ( tipo ) {

      case 'alumno':
        url += `/alumnos/${ img }`;
        break;


      case 'empresa':
        url += `/empresas/${ img }`;
        break;


      case 'personal':
        url += `/personal/${ img }`;
        break;


      case 'usuario':
        url += `/usuarios/${ img }`;
        break;

      default:
        console.log('tipo de imagen no existe, usuario, alumno, personal,empresa');
        url += '/usuarios/xxx';
    }
    return url;
  }

}
