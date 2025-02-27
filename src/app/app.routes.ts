import { Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { ProductosComponent } from './productos/productos.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [

    {path: '', component: PrincipalComponent}, // Componente por defecto principal imagen de nike
    {path: 'productos', component: ProductosComponent}, //componente de productos cuando damos click a productos aparece el componente de productos
    {path: 'admin', component: AdminComponent} //componente de admin cuando damos click a admin aparece el componente de admin
];
