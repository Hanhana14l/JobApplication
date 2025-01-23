import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { JobPostsComponent } from './pages/job-posts/job-posts.component';
import { JobAddingFormComponent } from './pages/job-adding-form/job-adding-form.component';
import { HomeComponent } from './pages/home/home.component';
import { JobDetailComponent } from './pages/job-detail/job-detail.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "jobPosts", component: JobPostsComponent},
  {path: "login", component: LoginComponent},
  {path: "registration", component: RegistrationComponent},
  {path: "profile", component: ProfileComponent},
  {path: "jobAdding", component: JobAddingFormComponent},
  {path: "jobDetail", component: JobDetailComponent},
  {path: "**", redirectTo: "", pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
