import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { UserComponent } from './pages/user/user.component';
import { UserProComponent } from './pages/user-pro/user-pro.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileProComponent } from './pages/profile-pro/profile-pro.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { EditEventComponent } from './components/shared/edit-event/edit-event.component';
import { EditPanelComponent } from './components/shared/edit-panel/edit-panel.component';
import { ClientRoutingModule } from './client-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListEventComponent } from './components/pages/list-event/list-event.component';
import { MapComponent } from 'src/app/components/shared/map/map.component';


@NgModule({
  declarations: [
    ClientComponent,
    UserComponent,
    UserProComponent,
    ProfileComponent,
    ProfileProComponent,
    RegisterComponent,
    LoginComponent,
    EditEventComponent,
    EditPanelComponent,
    ListEventComponent
    
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class ClientModule { }
