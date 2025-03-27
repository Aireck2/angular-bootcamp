import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginHistoryComponent } from './pages/admin/pages/login-history/login-history.component';
import { OrdersComponent } from './pages/admin/pages/orders/orders.component';
import { ProductsComponent } from './pages/admin/pages/products/products.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'login-history', component: LoginHistoryComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'products', component: ProductsComponent },
      { path: '**', redirectTo: 'products' },
    ],
  },
  { path: '**', redirectTo: 'home' },
];
