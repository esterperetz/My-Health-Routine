import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPharmacyComponent } from './add-pharmacy/add-pharmacy.component';
import { CalendearComponent } from './calendear/calendear.component';
import { CartComponent } from './cart/cart.component';
import { EnterAMedicineComponent } from './enter-a-medicine/enter-a-medicine.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { HealthStatementComponent } from './health-statement/health-statement.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NaturalProductsComponent } from './natural-products/natural-products.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OrdersComponent } from './orders/orders.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { PymentComponent } from './pyment/pyment.component';
import { RegisterComponent } from './register/register.component';
import { ReminderComponent } from './reminder/reminder.component';
import { SearchForAPharmacyComponent } from './search-for-a-pharmacy/search-for-a-pharmacy.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StatisticsDiagramsComponent } from './statistics-diagrams/statistics-diagrams.component';
import { UserInfoEditDetailsComponent } from './user-info-edit-details/user-info-edit-details.component';
import { UserInfoComponent } from './user-info/user-info.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'side',
    component: SidebarComponent,
  },
  {
    path: 'userInfo/:id',
    component: UserInfoEditDetailsComponent,
  },
  {
    path: 'userInfo',
    component: UserInfoComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'reminder',
    component: ReminderComponent,
  },
  {
    path: 'product/:SerialNumber',
    component: ProductDetailsComponent,
  },
  {
    path: 'product',
    component: ProductsComponent,
  },

  {
    path: 'Natural-products',
    component: NaturalProductsComponent,
  },
  {
    path: 'AddPharmacy',
    component: AddPharmacyComponent,
  },
  {
    path: 'navbar',
    component: NavbarComponent,
  },
  {
    path: 'Calendear',
    component: CalendearComponent,
  },
  {
    path: 'Search-For-A-Pharmacy',
    component: SearchForAPharmacyComponent,
  },
  {
    path: 'Health-Statement',
    component: HealthStatementComponent,
  },
  {
    path: 'Statistics',
    component: StatisticsDiagramsComponent,
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
  },

  {
    path: 'Enter-Med',
    component: EnterAMedicineComponent,
  },
  {
    path: 'pyment',
    component: PymentComponent,
  },
  {
    path: 'order',
    component: OrdersComponent,
  },
  {
    path: 'statisticDiagram',
    component: StatisticsDiagramsComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
