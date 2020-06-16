import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AcuerdoService {

  constructor(
    public http: HttpClient
  ) { }

 // ============================================================================
// Cargar Acuerdos
// ============================================================================
cargarAcuerdos( hasta: number = 5, desde: number = 0) {
  const url = `${URL_SERVICIOS}/acuerdo?hasta=${hasta}&desde=${desde}`;
  return this.http.get( url )
        .pipe( map( (resp: any) => resp.acuerdos ));
}


}
