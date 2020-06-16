import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  hasta: number = 5;
  desde: number = 0;
  totalRegistro: number = 0;

  cargando: boolean = true;

  constructor(
    public usuarioServices: UsuarioService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.modalUploadService.notificacion.subscribe( resp => {
    this.cargarUsuarios();
    });
  }
  mostrarModal( id: string ) {
    this.modalUploadService.mostrarModal( 'usuarios', id );
  }

// ============================================================================
// Cargar todos los usuarios
// ============================================================================
  cargarUsuarios() {
    this.cargando = true;
    this.usuarioServices.cargarUsuarios( this.hasta, this.desde )
            .subscribe( (resp: any) => {
                this.totalRegistro = resp.total;
                this.usuarios = resp.usuarios;
                this.cargando = false;
            });
  }

// ============================================================================
// Paginación
// ============================================================================
  cambiarDesde( valor: number ) {
    const desde = this.desde + valor;
    if ( desde >= this.totalRegistro ) {
      return;
    }
    if ( desde < 0 ) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

// ============================================================================
// Buscar usuarios
// ============================================================================
  buscarUsuario( termino: string ) {
    if ( termino.length <= 0 || termino.trim() === '' ) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this.usuarioServices.buscarUsuarios( termino )
      .subscribe( (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.totalRegistro = usuarios.length;
        this.cargando = false;
      });
  }
// ============================================================================
// Borrar un usuario
// ============================================================================
  borrarUsuario( usuario: Usuario ) {
    if ( usuario.id === this.usuarioServices.usuario.id ) {
      Swal.fire('No puede borrar el usuario', 'No se puede borar así mismo', 'error');
      return;
    }
    Swal.fire({
      title: '¿Esta seguro?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then( result => {
      if (result.value) {
        this.usuarioServices.borrarUsuario(usuario.id)
            .subscribe( resp => {
              this.cargarUsuarios();
            });
        Swal.fire(
          'Borrado!',
          `El usuario ${usuario.nombre} fue borrado`,
          'success'
        );
      }
    });

  }

// ============================================================================
// Guardar el cambio de ROLE de un usuario
// ============================================================================
  guardarUsuario( usuario: Usuario ) {
    this.usuarioServices.actualizarUsuario( usuario )
          .subscribe();
  }

}
