import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

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
  },
  {
    path: '404', component: NotfoundComponent
  },
  {
    path: '**', redirectTo: '/404'
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
