import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { JobPostsComponent } from './pages/job-posts/job-posts.component';
import { JobAddingFormComponent } from './pages/job-adding-form/job-adding-form.component';
import { HomeComponent } from './pages/home/home.component';
import { ApplicationFormComponent } from './pages/application-form/application-form.component';
import { JobDetailComponent } from './pages/job-detail/job-detail.component';
import { JobPortalComponent } from './pages/job-portal/job-portal.component';
import { ApplingFormComponent } from './pages/appling-form/appling-form.component';
import { AuthGuard, RoleGuard } from './guards/auth.guard';
const routes: Routes = [
  {path: "", component: JobPortalComponent},
  {path: "jobPosts", component: JobPostsComponent,
  },
  {path: "login", component: LoginComponent},
  {path: "registration", component: RegistrationComponent},
  {path: "profile", component: ProfileComponent},
  {path: "jobAdding", 
    component: JobAddingFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'recruiter' }
  },
  {path: "jobDetail", component: JobDetailComponent},
  { path: 'apply/:id', component: ApplicationFormComponent },
  {path: "**", redirectTo: "", pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
