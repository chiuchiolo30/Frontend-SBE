import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// ============================================================================
// SweetAlert 2
// ============================================================================
import Swal from 'sweetalert2';

// ============================================================================
// Servicios
// ============================================================================
import { UsuarioService } from '../services/service.index';

// ============================================================================
// Esquema de usuario
// ============================================================================
import { Usuario } from 'src/app/models/usuario.model';


declare function init_plugins();


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

   forma: FormGroup;

  constructor(
    public usuarioServices: UsuarioService
  ) { }

  sonIguales( campo1: string, campo2: string) {

    return( group: FormGroup ) => {

      const password  = group.controls[campo1].value;
      const password2 = group.controls[campo2].value;

      return ( password === password2 ) ? null : { sonIguales: true };
    //       sonIguales: true // este es el error que impedira que el formulario sea válido
    };
  }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
        nombre: new FormControl( null, Validators.required ),
        email: new FormControl(  null, [Validators.required, Validators.email] ),
        password: new FormControl(  null, Validators.required ),
        password2: new FormControl(  null, Validators.required ),
        condiciones: new FormControl( false )
    }, { validators: this.sonIguales( 'password', 'password2') });
  }

  registrarUsuario() {

    if ( this.forma.invalid) { return; }
    if ( !this.forma.value.condiciones ) {
      Swal.fire({
        icon: 'warning',
        title: 'Importante',
        text: 'Debe de aceptar las condicones!'
      });
      console.log('Debe de aceptar las condiciones');
      return;
    }
    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password
    );

    this.usuarioServices.crearUsuario( usuario )
          .subscribe( resp => {
            console.log(resp);
          });
  }



}
