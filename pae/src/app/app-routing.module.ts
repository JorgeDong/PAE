import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PanelDashboardComponent } from './components/dashboard/panel-dashboard/panel-dashboard.component';
import { NuevoProductoDashboardComponent   } from './components/dashboard/nuevo-producto-dashboard/nuevo-producto-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SubastaDetalleComponent } from './components/subasta-detalle/subasta-detalle.component';
import { BuscarSubastaComponent } from './components/buscar-subasta/buscar-subasta.component';
import { EditarProductoDashboardComponent } from './components/dashboard/editar-producto-dashboard/editar-producto-dashboard.component';
import { ComentariosUsuariosComponent } from './components/comentarios-usuarios/comentarios-usuarios.component';
import { LiveAuctionComponent } from './components/liveAuction/live-auction.component';
import { AuthGuardService } from './services/auth/auth-guard.service';

const routes: Routes = [
  { path: 'home' , component: HomeComponent},
  { path: 'subasta-detalle/:id' , component: SubastaDetalleComponent},
  { path: 'subasta-buscar' , component: BuscarSubastaComponent},
  { path: 'comentarios/:id' , component: ComentariosUsuariosComponent},
  { path: '' , redirectTo: '/home', pathMatch: 'full'},
  { path: 'dashboard' , component: DashboardComponent,
    children: [
      {path:'', component: PanelDashboardComponent, canActivate:[AuthGuardService]},
      {path:'nuevo-producto', component: NuevoProductoDashboardComponent},
      {path:'editar-producto', component: EditarProductoDashboardComponent},
    ]
  },
  { path: 'login', component: LoginComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuardService]},
  //{ path: 'profile', component: ProfileComponent},
  { path: 'profile/edit', component: ProfileComponent},
  { path: 'live', component: LiveAuctionComponent}
//{path: '**' , component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
