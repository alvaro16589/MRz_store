import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { LoginComponent } from './login/login-father/login.component';
import { LayoutConfComponent } from './inOutItems/layout-conf/layout-conf.component';
import { rolUserGuard, userInterfaceLoginGuard, userLoggedCanAccess } from './core/guards/rol-user.guard';
import { LayoutUserOrderComponent } from './order-history/layout-user-order/layout-user-order.component';



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
                loadComponent: () => import('./home-pages/dashboard/dashboard.component').then(c => c.DashboardComponent)
            },
            {
                path: 'invoice',
                loadComponent: () => import('./home-pages/invoice/invoice.component').then(c => c.InvoiceComponent)
            },
            {
                path: 'detail/:id',
                loadComponent: () => import('./home-pages/detail/detail.component').then(c => c.DetailComponent)
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [userInterfaceLoginGuard],
        children: [
            {
                path: '',
                redirectTo: 'session',
                pathMatch: 'full'

            },
            {
                path: 'session',
                loadComponent: () => import('./login/user-session/user-session.component').then(c => c.UserSessionComponent),
                              
            },
            {
                path: 'register',
                loadComponent: () => import('./login/user-register/user-register.component').then(c => c.UserRegisterComponent)
            }
        ]
    },
    {
        path: 'config',
        component: LayoutConfComponent,
        canActivateChild: [rolUserGuard],
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
            }
        ]
    },
    {
        path: 'history',
        component: LayoutUserOrderComponent,
        canActivateChild: [userLoggedCanAccess],
        children: [
            {
                path: '',
                redirectTo: 'order-items',
                pathMatch: 'full'

            },
            {
                path: 'order-items',
                loadComponent: () => import('./order-history/order-items/order-items.component').then(c => c.OrderItemsComponent)                
            } 
        ]
    },
    {
        path: '**',
        loadComponent: () => import('./not-found/not-found.component').then(c => c.NotFoundComponent)
    }
    

];
