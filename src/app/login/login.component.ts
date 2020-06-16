import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgForm } from '@angular/forms';

import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { CLIENT_ID } from '../config/config';
import { element } from 'protractor';

declare function init_plugins();
// Google
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;
// Google
  auth2: any;

  constructor(
    public router: Router,
    public usuarioServices: UsuarioService
  ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 0) { this.recuerdame = true; }

  }
// ============================================================================
// Inicia el servicio de Google
// ============================================================================
  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: CLIENT_ID,
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin( document.getElementById('btnGoogle'));
    });
  }

// ============================================================================
// Inicio de sesión con cuenta de Google
// ============================================================================
  attachSignin( element ) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      // Obtiene la información básica, Email - ID - Image Url - Full Name - Gavin Name - Family Name - Token
      const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this.usuarioServices.loginGoogle( token )
              .subscribe( () => window.location.href = '#/dashboard');
    });
  }
// ============================================================================
// Inicio de sesión Normal (Email - contraseña)
// ============================================================================
  ingresar( forma: NgForm ) {
    if ( forma.invalid ) { return; }
    const usuario = new Usuario( null, forma.value.email, forma.value.password );
    this.usuarioServices.login(usuario, forma.value.recuerdame)
          .subscribe( () => this.router.navigate( ['/dashboard'] ));
  }

}
