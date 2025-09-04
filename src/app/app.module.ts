import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // ✅ add this line
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardComponent } from './layouts/dashboard-layout/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ServicesComponent,
    ContactComponent,
    RegisterComponent,
    LoginComponent,
    LandingLayoutComponent,
    AuthLayoutComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule 
      
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
