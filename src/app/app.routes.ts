import { Routes } from "@angular/router";
import { ProductsComponent } from "./products/products.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { MainLayoutComponent } from "./layouts/main-layout/main-layout.component";
import { isAuthGuard } from "./is-auth.guard";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { HomeComponent } from "./home/home.component";

export const routes: Routes = [
  {
    path: "auth",
    component: AuthLayoutComponent,
    children: [
      {
        path: "login",
        loadComponent: () =>
          import("./auth/login/login.component").then((m) => m.LoginComponent),
      },
    ],
  },
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      { path: "products", component: ProductsComponent },
      { path: "products/:id", component: ProductDetailComponent },
      { path: "", component: HomeComponent },
    ],
  },
  {
    path: "admin",
    component: AdminLayoutComponent,
    canActivate: [isAuthGuard],
    children: [
      {
        path: "",
        loadComponent: () =>
          import("./admin/admin.component").then((m) => m.AdminComponent),
      },
    ],
  },
];
