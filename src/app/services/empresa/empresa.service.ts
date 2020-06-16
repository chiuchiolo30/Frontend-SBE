import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(
    public http: HttpClient
  ) { }

 // ============================================================================
// Cargar Empresas
// ============================================================================
cargarEmpresas( hasta: number = 5, desde: number = 0) {
  const url = `${URL_SERVICIOS}/empresa?hasta=${hasta}&desde=${desde}`;
  return this.http.get( url )
        .pipe( map( (resp: any) => resp.empresas ));
}

}
