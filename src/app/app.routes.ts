import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { LoginComponent } from './login/login-father/login.component';
import { LayoutConfComponent } from './inOutItems/layout-conf/layout-conf.component';



export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'home/todos',
                pathMatch: 'full'

            },
            {
                path: 'home/:id',
                loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent)
            },
            {
                path: 'invoice',
                loadComponent: () => import('./invoice/invoice.component').then(c => c.InvoiceComponent)
            },
            {
                path: 'detail/:id',
                loadComponent: () => import('./detail/detail.component').then(c => c.DetailComponent)
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        children: [
            {
                path: '',
                redirectTo: 'session',
                pathMatch: 'full'

            },
            {
                path: 'session',
                loadComponent: () => import('./login/user-session/user-session.component').then(c => c.UserSessionComponent)                
            },
            {
                path: 'register',
                loadComponent: () => import('./login/user-register/user-register.component').then(c => c.UserRegisterComponent)
            },
        ]
    },
    {
        path: 'config',
        component: LayoutConfComponent,
        children: [
            {
                path: '',
                redirectTo: 'product',
                pathMatch: 'full'

            },
            {
                path: 'product',
                loadComponent: () => import('./inOutItems/products-conf/products/products.component').then(c => c.ProductsComponent)                
            }, 
            {
                path: 'editprod/:id',
                loadComponent: () => import('./inOutItems/products-conf/edit-product/edit-product.component').then(c => c.EditProductComponent)                
            },
        ]
    },
    {
        path: '**',
        loadComponent: () => import('./not-found/not-found.component').then(c => c.NotFoundComponent)
    },
    

];
