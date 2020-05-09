import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PanelDashboardComponent } from './components/dashboard/panel-dashboard/panel-dashboard.component';
import { NuevoProductoDashboardComponent   } from './components/dashboard/nuevo-producto-dashboard/nuevo-producto-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: 'home' , component: HomeComponent},
  { path: '' , redirectTo: '/home', pathMatch: 'full'},
  { path: 'dashboard' , component: DashboardComponent,
    children: [
      {path:'', component: PanelDashboardComponent},
      {path:'nuevo-producto', component: NuevoProductoDashboardComponent}]
  },
  { path: 'login', component: LoginComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'profile', component: ProfileComponent} 
//{path: '**' , component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
