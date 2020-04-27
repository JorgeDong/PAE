import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PanelDashboardComponent } from './components/dashboard/panel-dashboard/panel-dashboard.component';
import { NuevoProductoDashboardComponent   } from './components/dashboard/nuevo-producto-dashboard/nuevo-producto-dashboard.component';

const routes: Routes = [
  { path: 'home' , component: HomeComponent},
  { path: '' , redirectTo: '/home', pathMatch: 'full'},
  { path: 'dashboard' , component: DashboardComponent,
    children: [
      {path:'', component: PanelDashboardComponent},
      {path:'nuevo-producto', component: NuevoProductoDashboardComponent}

  ]},
//{path: '**' , component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
