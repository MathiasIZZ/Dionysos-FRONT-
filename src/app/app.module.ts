import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';

import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MarkerService } from './services/marker.service';
import { PopupPanelService } from './services/popup-panel.service';
import { ClientModule } from './modules/client/client.module';

import {MatIconModule} from "@angular/material/icon";
import {ToastrModule} from "ngx-toastr";
import { MapComponent } from './components/shared/map/map.component';
import { ListEventComponent } from './modules/client/components/pages/list-event/list-event.component';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    NotfoundComponent,
    MapComponent,
    ListEventComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ClientModule,
    MatIconModule,
    ToastrModule.forRoot()
  ],
  providers: [authInterceptorProviders, MarkerService, PopupPanelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
