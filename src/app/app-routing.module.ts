import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => 
    m.AdminModule)
  },
  {
    path: 'client',
    loadChildren: () => import('./modules/client/client.module').then(m => 
    m.ClientModule)
  },
  {
    path: '',
    component: HomeComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
