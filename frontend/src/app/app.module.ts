import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms"
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatErrorModule } from '@angular/material/core'; 

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { JobPostsComponent } from './pages/job-posts/job-posts.component';
import { JobAddingFormComponent } from './pages/job-adding-form/job-adding-form.component';
import { HomeComponent } from './pages/home/home.component';
import { JobDetailComponent } from './pages/job-detail/job-detail.component';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { ApplingFormComponent } from './pages/appling-form/appling-form.component';
import { JobPortalComponent } from './pages/job-portal/job-portal.component';
import { ApplicationFormComponent } from './pages/application-form/application-form.component'; 
import { AuthGuard, RoleGuard } from './guards/auth.guard';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    JobPostsComponent,
   
    HomeComponent,
    JobDetailComponent,
    NavBarComponent,
    JobAddingFormComponent,
    ApplingFormComponent,
    JobPortalComponent,
    ApplicationFormComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule ,
 
    HttpClientModule,
    BrowserAnimationsModule,
   MatInputModule,
    MatSelectModule ,
    MatButtonModule,
    MatFormFieldModule,

  ],
  providers: [
    provideClientHydration(),
    AuthGuard,
    RoleGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }







