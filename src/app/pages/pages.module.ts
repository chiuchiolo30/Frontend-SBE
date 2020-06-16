import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ============================================================================
// Modulos personalizados
// ============================================================================
import { SharedModule } from '../shared/shared.module';

// ============================================================================
// Componentes
// ============================================================================
import { PagesComponent } from './pages.component'; // Principla
import { AcuerdosComponent } from './acuerdos/acuerdos.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { ConveniosComponent } from './convenios/convenios.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { PersonalComponent } from './personal/personal.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProfileComponent } from './profile/profile.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';

import { PeopleComponent } from './personal/people.component';
import { AlumnoComponent } from './alumnos/alumno.component';

// ============================================================================
// Rutas hijas
// ============================================================================
import { PAGES_ROUTES } from './pages.routes';

// ============================================================================
// Pipes Módulo
// ============================================================================
import { PipesModule } from '../pipes/pipes.module';

// ============================================================================
// Módulos par el uso de formularios - template y reactiveFormss
// ============================================================================
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({

    declarations: [
        PagesComponent,
        AcuerdosComponent,
        AlumnosComponent,
        ConveniosComponent,
        DashboardComponent,
        EmpresasComponent,
        PersonalComponent,
        AccoutSettingsComponent,
        UsuariosComponent,
        ProfileComponent,
        ModalUploadComponent,
        PeopleComponent,
        AlumnoComponent
    ],
    exports: [
        DashboardComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        PipesModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]

})

export class PagesModule { }
