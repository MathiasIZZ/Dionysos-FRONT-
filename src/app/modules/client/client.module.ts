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
    EditPanelComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }