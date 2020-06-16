import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    public usuarioServices: UsuarioService,
    public router: Router
  ) { }
  canActivate() {

    if ( this.usuarioServices.estaLogeado() ) {
      console.log('paso el guards');
      return true;
    } else {
      console.log('bloqueda por el guards');
      this.router.navigate(['/login']);
    }

  }
}
