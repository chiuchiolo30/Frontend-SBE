import { Routes, RouterModule } from '@angular/router';

// ============================================================================
// Componentes
// ============================================================================
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AcuerdosComponent } from './acuerdos/acuerdos.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { ConveniosComponent } from './convenios/convenios.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { PersonalComponent } from './personal/personal.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProfileComponent } from './profile/profile.component';

// ============================================================================
// Guards
// ============================================================================
import { LoginGuard } from '../services/service.index';
import { PeopleComponent } from './personal/people.component';
import { AlumnoComponent } from './alumnos/alumno.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [
            LoginGuard
        ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'}},
            { path: 'acuerdos', component: AcuerdosComponent, data: { titulo: 'Acuerdos'}},

            { path: 'alumnos', component: AlumnosComponent, data: { titulo: 'Alumnos'}},
            { path: 'alumno/:id', component: AlumnoComponent, data: { titulo: 'Alumno'}},

            { path: 'convenios', component: ConveniosComponent, data: { titulo: 'Convenios'}},
            { path: 'empresas', component: EmpresasComponent, data: { titulo: 'Empresas'}},

            { path: 'personal', component: PersonalComponent, data: { titulo: 'Personal'}},
            { path: 'people/:id', component: PeopleComponent, data: { titulo: 'People'}},

            { path: 'account-settings', component: AccoutSettingsComponent, data: { titulo: 'Configuración'}},
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario'}},
            // Mantenimientos
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuarios'}},
            { path: '', redirectTo: 'dashboard', pathMatch: 'full'}
                  ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
