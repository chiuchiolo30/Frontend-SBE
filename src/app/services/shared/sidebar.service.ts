import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Dashboard', url: '/dashboard'},
        {titulo: 'Alumnos', url: '/alumnos'},
        {titulo: 'Acuerdos', url: '/acuerdos'},
        {titulo: 'Convenios', url: '/convenios'},
        {titulo: 'Empresas', url: '/empresas'},
        {titulo: 'Personal', url: '/personal'}
      ]
    },
    {
      titulo: 'Mantenimieto',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo: 'Usuarios', url: '/usuarios'}
      ]
    }
  ];

  constructor() { }
}
