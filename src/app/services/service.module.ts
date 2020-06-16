import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
// ============================================================================
// Centralizamos los servicios
// ============================================================================
import {
        SettingsService,
        SidebarService,
        SharedService,
        UsuarioService,
        EmpresaService,
        PersonalService,
        AlumnoService,
        AcuerdoService,
        LoginGuard,
        SubirArchivoService
       } from './service.index';

@NgModule({
  declarations: [],
  imports: [
          CommonModule,
          HttpClientModule
  ],
  providers: [
          SettingsService,
          SidebarService,
          SharedService,
          UsuarioService,
          PersonalService,
          EmpresaService,
          AlumnoService,
          AcuerdoService,
          LoginGuard,
          SubirArchivoService,
          ModalUploadService
  ]
})
export class ServiceModule { }
