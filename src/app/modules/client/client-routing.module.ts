import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { ListEventComponent } from './components/pages/list-event/list-event.component';
import { EditEventComponent } from './components/shared/edit-event/edit-event.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
    { 
        path: '', 
        component: ClientComponent 
    },
    { 
        path: 'login', 
        component: LoginComponent 
    },
    { 
        path: 'register', 
        component: RegisterComponent 
    },
    {   
        path: 'profile', 
        component: ProfileComponent },
    {   
        path: 'user', 
        component: UserComponent },
    {   
        path: 'event', 
        component: ListEventComponent },
    {   
        path: 'add/event', 
        component: EditEventComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
