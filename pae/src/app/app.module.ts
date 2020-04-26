import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    PanelDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
