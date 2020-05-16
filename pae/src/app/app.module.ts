import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarDashboardComponent } from './components/dashboard/sidebar-dashboard/sidebar-dashboard.component';
import { NavbarDashboardComponent } from './components/dashboard/navbar-dashboard/navbar-dashboard.component';
import { FooterDashboardComponent } from './components/dashboard/footer-dashboard/footer-dashboard.component';
import { PanelDashboardComponent } from './components/dashboard/panel-dashboard/panel-dashboard.component';
import { NuevoProductoDashboardComponent } from './components/dashboard/nuevo-producto-dashboard/nuevo-producto-dashboard.component';
import { environment } from 'src/environments/environment';
import { LiveAuctionComponent } from './components/liveAuction/live-auction.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SubastaDetalleComponent } from './components/subasta-detalle/subasta-detalle.component';
import { BuscarSubastaComponent } from './components/buscar-subasta/buscar-subasta.component';
import { ComentariosUsuariosComponent } from './components/comentarios-usuarios/comentarios-usuarios.component';
import { EditarProductoDashboardComponent } from './components/dashboard/editar-producto-dashboard/editar-producto-dashboard.component';
import { CreditosComponent } from './components/dashboard/creditos/creditos.component';
import { SubastaComponent } from './components/subasta/subasta.component';
import { PassManagerComponent } from './components/pass-manager/pass-manager/pass-manager.component';

const config: SocketIoConfig = { url: environment.url, options: {}}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DashboardComponent,
    SidebarDashboardComponent,
    NavbarDashboardComponent,
    FooterDashboardComponent,
    PanelDashboardComponent,
    NuevoProductoDashboardComponent,
    LiveAuctionComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    SubastaDetalleComponent,
    BuscarSubastaComponent,
    ComentariosUsuariosComponent,
    EditarProductoDashboardComponent,
    CreditosComponent,
    SubastaComponent,
    PassManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    SocketIoModule.forRoot(config),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
