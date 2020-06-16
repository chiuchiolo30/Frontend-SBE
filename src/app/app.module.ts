import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// ============================================================================
// Rutas
// ============================================================================
import { APP_ROUTES } from './app.routes';

// ============================================================================
// Modulos personalizados
// ============================================================================
import { PagesModule } from './pages/pages.module';

// ============================================================================
// Componentes
// ============================================================================
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

// ============================================================================
// Módulo - Servicios centralizados
// ============================================================================
import { ServiceModule } from './services/service.module';

// ============================================================================
// Módulos par el uso de formularios - template y reactiveFormss
// ============================================================================
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    ServiceModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
