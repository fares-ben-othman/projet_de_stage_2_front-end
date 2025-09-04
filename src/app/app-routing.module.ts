import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { DashboardComponent } from './layouts/dashboard-layout/dashboard.component';
import { AuthGuard } from './guards/auth.guard'; // <- import AuthGuard

const routes: Routes = [
  // Landing pages (header + footer)
  {
    path: '',
    component: LandingLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'contact', component: ContactComponent }
    ]
  },

  // Auth pages (no header/footer)
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },

  // Dashboard page (protégé)
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard] // <- sécurise la route
  },

  // Wildcard redirect
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
